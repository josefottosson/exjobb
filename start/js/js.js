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
			myApp.makeAjaxCall(app, method);
		})
	},

	makeAjaxCall: function(app, method)
	{
		var startTime = "";
		var endTime = "";
		var totalTime = "";
		var times = [];
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
		  method += "/";
		  break;
		case "NODE":
		  urlToCall = "http://127.0.0.1:8888/";
		  break;
		default:
			console.log('Felaktig request');
			return;
		}

			makeCall(urlToCall, method);
		function makeCall(urlToCall, method)
		{
			var testOutput = $('#testOutput');
			$.ajax({
			    type: "POST",
			    url: "phpProxy.php",
			    data: "url=" + urlToCall + method,
			    beforeSend: function()
			    {
			    	document.write(app + ' -- Starting round ' + (i+1) + "<br />");
			    	document.write("URL: " + urlToCall + method + "<br />");
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
				    document.write('\tTotal time: <strong>' + totalTime + 'ms</strong>' + "<br />");
				    times.push(row);
				    //document.write(data + "<br />");
				    document.write('Round done\n' + "<br />" + "<br />");
			    },
			    error: function(err) {
			    	console.log('Error');
			        console.log(err);
			    },
			    complete: function()
			    {
			    	i++;
			    	if(i < 50)
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
						$('body').prepend('<h3>Slowest: ' + highest + 'ms</h3>');
						$('body').prepend('<h3>Fastest: ' + lowest + 'ms</h3>');
						$('body').prepend('<h3>Average: ' + avg + 'ms</h3>');

						//myApp.saveToDb(times);
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

	}
};

window.onload = myApp.init;