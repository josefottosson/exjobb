var myApp = {

	init: function()
	{	// Creates the dropdowns.
		var methodDropdown = $('#methodDropdown').hide();
		var startTest = $('#startTest').hide();
		var app = "";
		var method = "";

		// Some logic, show/hide dropdowns depending on user interaction.
		$('#appDropdown').change(function(){
			app = $('#appDropdown').find(":selected").text();
			methodDropdown.show();
		});
		$(methodDropdown).change(function(){
			method = $(methodDropdown).find(":selected").text();
			startTest.show();
		});
		$(startTest).click(function(){
			$('#testOutput').empty();
			$('#chartDiv').empty();
			myApp.makeAjaxCall(app, method);
		});

		$('#showDataLink').click(function(){
			$('#appDropdown').hide();
			myApp.getTestData();
		});
	},

	makeAjaxCall: function(app, method)
	{
		var startTime = "";
		var endTime = "";
		var totalTime = "";
		var times = [];
		var objectArray = [];
		var i = 0;
		var highest = 0;
		var lowest = 100000;
		var testRounds = 1000;
		var urlToCall = "";

		switch(app)
		{
		case "PHP":
		  urlToCall = "http://localhost/exjobb/";
		  break;
		case "RAILS":
		  urlToCall = "http://localhost:3000/home/";
		  break;
		case "DJANGO":
		  urlToCall = "http://127.0.0.1:8000/";
		  //Appends a slash if Django because django doesn't like urls without an slash at the end
		  method += "/";
		  break;
		case "NODE":
		  urlToCall = "http://127.0.0.1:8888/";
		  break;
		default:
			console.log('Felaktig request');
			return;
		}

		var testOutput = $('#testOutput');
		$('#testOutput').append("<h2>APP: "+app+ "</h2>");
		$('#testOutput').append("<p>URL: "+urlToCall+method +"</p><hr/>");
		makeCall(urlToCall, method);
		
		function makeCall(urlToCall, method)
		{
			$.ajax({
			    type: "POST",
			    url: "phpProxy.php",
			    data: "url=" + urlToCall + method,
			    beforeSend: function()
			    {
			    	startTime = new Date().getTime();
			    },
			    success: function(data) {
				    endTime = new Date().getTime();
				    totalTime = endTime - startTime;
				    if(totalTime > highest)
				    {
				    	highest = totalTime;
				    }
				    if(totalTime < lowest)
				    {
				    	lowest = totalTime;
				    }
				    // Creates an row object, for inserting in the DB:
				   	var row = {};
					row.app = app;
					row.operation = method;
					row.totalTime = totalTime;
					row.run = i+1;
					row.date = new Date();
				    testOutput.prepend('<p>Round '+(i+1)+' done</p>' + '<p>Total time: <strong>' + totalTime + 'ms</strong>' + "</p>");
				    // The PHP proxy takes an array when performing the insert query to the DB 
				    //MONGODB has an 200 rows limit as standard when performing insert operations
				    // TODO - Insert data every 200 rows instead of one at a time
				    objectArray.push(row);
				    times.push(row);
				    myApp.saveToDb(objectArray);
				    //Emptys the objectarray because we are inserting data every round, TODO - Add logic for insert every 200 round.
				    objectArray = [];
			    },
			    error: function(err) {
			    	console.log('Error');
			        console.log(err);
			    },
			    complete: function()
			    {
			    	i++;
			    	// Call yourself as long as i is less than number of testRounds.
			    	if(i < testRounds)
			    	{
			    		makeCall(urlToCall, method);
					}
					// When the test is done, make some calculations and present a chart.
					else
					{
						var sum = 0;
						for(var j = 0; j < times.length; j++)
						{
						    sum += parseInt(times[j].totalTime);
						}
						var avg = sum/times.length;
						$('#testOutput').prepend('<h3>Slowest: ' + highest + 'ms</h3>');
						$('#testOutput').prepend('<h3>Fastest: ' + lowest + 'ms</h3>');
						$('#testOutput').prepend('<h3>Average: ' + avg + 'ms</h3>');

						//GENERATE CHART
						myApp.createSingleChart(times, highest, lowest);
					}
			    }
			});
		}
	},

	saveToDb: function(times)
	{

		$.ajax({
	        url: "../../exjobb/insert",
	        type: "POST",
	        async: false,
	        data: { times: times },
	        beforeSend: function()
	        {
	        	console.log('Skickar data till DB');
	        },
	        success: function(data)
	        {
	        	console.log(data);
	        },
	        error: function(err)
	        {
	        	console.log(err);
	        }
    	});

	},

	//Creates the chart that displays after a testround
	createSingleChart: function(series, highest, lowest)
	{	
		$('#chartDiv').highcharts({
            chart: {
                type: 'scatter',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Benchmark for ' + series[0].app,
                x: -20 //center
            },
            subtitle: {
                text: 'Method: ' + series[0].operation,
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Round'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            yAxis: {
            	min: 0,
            	max: highest + 100,
                title: {
                    text: 'Time (ms)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'ms'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series : [{
    			name : series[0].app,
			    data : (function() {
			        var data = [];
			        for(var j = 0; j < series.length; j++)
			        {
			        	data.push([series[j].run, series[j].totalTime]);
			        }                
			        return data;
			    })()
			}]
        });
	},
	// Gets data from the DB
	getTestData: function()
	{
		var methodDropdown = $('#methodDropdown').unbind().show();
		var method = "";
			methodDropdown.change(function(){
				method = $(methodDropdown).find(":selected").text();
				GetData(method);
			});

		function GetData(method)
		{
			//Make ajaxcall to the PHP script that retrieves the data.
			$.ajax({
			    type: "POST",
			    url: "phpProxy.php",
			    data: "url=localhost/exjobb/GetData?" + method,
			    beforeSend: function()
			    {
			    	console.log('start');
			    },
			    success: function(data) {
			    	data = JSON.parse(data);
			    	data = myApp.prepareDataForMultipleSeries(data);
			    	myApp.createMultipleSeriesChart(data);
			    },
			    error: function(err) {
			    	console.log('Error');
			        console.log(err);
			    },
			    complete: function()
			    {
			    	console.log('done');
			    }
			});
		}
	},

	//Feels DRY but this is the only way to do it when using HighCharts and multiple Series.
	prepareDataForMultipleSeries: function(testData)
	{
		$('#testOutput').empty();
		$('#averageTime').empty();
		var node = [];
		var rails = [];
		var php = [];
		var django = [];
		var highest = 0;
		var data = [];

		$.each(testData, function(index, value) {
	  
			if(value.app === "NODE")
			{
				node.push(value);
			}
			else if(value.app === "PHP")
			{
				php.push(value);
			}
			else if(value.app === "DJANGO")
			{
				django.push(value);
			}
			else
			{
				rails.push(value);
			}

			if(value.totalTime > highest)
			{
				highest = parseInt(value.totalTime);
			}
		});
		data.rails = rails;
		data.django = django;
		data.node = node;
		data.php = php;
		data.highest = highest;
		return data;
	},
	//Creates the chart when viewing testdata for a function
	createMultipleSeriesChart: function(testData)
	{
		$('#testOutput').highcharts({
            chart: {
                type: 'scatter',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Benchmark for ' + "PHP, Node, Django and Rails",
                x: -20 //center
            },
            subtitle: {
                text: 'Method: ' + testData.node[0].operation,
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Round'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            yAxis: {
            	min: 0,
            	max: testData.highest + 50,
                title: {
                    text: 'Time (ms)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'ms'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series : [{
    			name : "NODE",
			    data : (function() {
			        var data = [];
			        var sum = 0;
			        for(var j = 0; j < testData.node.length; j++)
			        {
			        	sum += parseInt(testData.node[j].totalTime);
			        	data.push([parseInt(testData.node[j].run), parseInt(testData.node[j].totalTime)]);
			        }  
			        var avg = parseInt(sum/testData.node.length);
			        $('#averageTime').append("Node: " + avg + "ms" + "<br/>");

			        return data;
			    })()
			}, {
    			name : "PHP",
			    data : (function() {
			        var data = [];
			        var sum = 0;
			        for(var j = 0; j < testData.php.length; j++)
			        {
			        	sum += parseInt(testData.php[j].totalTime);
			        	data.push([parseInt(testData.php[j].run), parseInt(testData.php[j].totalTime)]);
			        }
			        var avg = parseInt(sum/testData.php.length);
			        $('#averageTime').append("PHP: " + avg + "ms" + "<br/>");                
			        return data;
			    })()
			},
			{
    			name : "DJANGO",
			    data : (function() {
			        var data = [];
			        var sum = 0;
			        for(var j = 0; j < testData.django.length; j++)
			        {
			        	sum += parseInt(testData.django[j].totalTime);
			        	data.push([parseInt(testData.django[j].run), parseInt(testData.django[j].totalTime)]);
			        }
			        var avg = parseInt(sum/testData.django.length);
			        $('#averageTime').append("Django: " + avg + "ms" + "<br/>");                
			        return data;
			    })()
			},
			{
    			name : "RAILS",
			    data : (function() {
			        var data = [];
			        var sum = 0;
			        for(var j = 0; j < testData.rails.length; j++)
			        {
			        	sum += parseInt(testData.rails[j].totalTime);
			        	data.push([parseInt(testData.rails[j].run), parseInt(testData.rails[j].totalTime)]);
			        } 
			      	var avg = parseInt(sum/testData.rails.length);
			        $('#averageTime').append("Rails: " + avg + "ms");               
			        return data;
			    })()
			}]
        });
	}
};

window.onload = myApp.init;