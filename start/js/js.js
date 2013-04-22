var myApp = {

	init: function()
	{
		myApp.makeAjaxCall();
	},

	makeAjaxCall: function()
	{
		var urlRequest = window.location.search;
		var splitted = urlRequest.split('&');
		var app = splitted[0].toUpperCase();
			app = app.substring(1);
		var method = splitted[1];

		var startTime = "";
		var endTime = "";
		var totalTime = "";
		var times = [];
		var i = 0;

		var urlToCall = "";

		switch(app)
		{
		case "PHP":
		  urlToCall = "http://localhost/exjobb/";
		  break;
		case "RAILS":
		  urlToCall = "http://localhost:3000/home/";
		  break;
		default:
			console.log('Felaktig request');
			return;
		}

			makeCall(urlToCall, method);
		function makeCall(urlToCall, method)
		{
			var params = "url=" + urlToCall + method;
			console.log(params);
			$.ajax({
			    type: "POST",
			    url: "phpProxy.php",
			    data: params,
			    beforeSend: function()
			    {
			    	console.log(app + ' -- Starting round ' + (i+1));
			    	startTime = new Date().getTime();
			    },
			    success: function(data) {
				    endTime = new Date().getTime();
				    totalTime = endTime - startTime;
				   	var row = {};
					row.app = app;
					row.operation = method;
					row.totalTime = totalTime;
					row.run = i+1;
					row.date = new Date();
				    console.log('\tTotal time: ' + totalTime + 'ms');
				    times.push(row);
				    console.log(data);
				    console.log('Round done\n');
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
						myApp.saveToDb(times);
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