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
				    objectArray.push(row);
				    times.push(row);
				    myApp.saveToDb(objectArray);
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
						myApp.createChart(times, highest, lowest);
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

	createChart: function(series, highest, lowest)
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
	}
};

window.onload = myApp.init;