var myApp = {

	init: function()
	{
		var methodDropdown = $('#methodDropdown').hide();
		var startTest = $('#startTest').hide();
		var app = "";
		var method = "";
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
		  //Lägger till ett slash på slutet eftersom Django kräver det för liknande requests
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
				   	var row = {};
					row.app = app;
					row.operation = method;
					row.totalTime = totalTime;
					row.run = i+1;
					row.date = new Date();
				    testOutput.prepend('<p>Round '+(i+1)+' done</p>' + '<p>Total time: <strong>' + totalTime + 'ms</strong>' + "</p>");
				    //PHP Proxyn tar emot en array när insättningen till DB ska ske. 
				    //MONGODB har en gräns på 200 inserts som standard, TODO, kör batch insättningar istället för varje runda.
				    objectArray.push(row);
				    times.push(row);
				    //myApp.saveToDb(objectArray);
				    objectArray = [];
			    },
			    error: function(err) {
			    	console.log('Error');
			        console.log(err);
			    },
			    complete: function()
			    {
			    	i++;
			    	if(i < 1000)
			    	{
			    		makeCall(urlToCall, method);
					}
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

	prepareDataForMultipleSeries: function(testData)
	{
	//Känns DRY att ha två liknande funktioner men enda sättet att få Highcharts att använda flera series.
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