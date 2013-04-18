var myApp = {

	init: function()
	{
		myApp.makeAjaxCall();
	},

	makeAjaxCall: function()
	{
		var startTime = "";
		var endTime = "";
		var totalTime = "";
		var app = "PHP";
		var times = [];
		var i = 0;
		makeCall();
		
		function makeCall()
		{
			//
			var operation = "GetAllPosts";
			$.ajax({
			    type: "GET",
			    url: "../../exjobb/AllPosts",
			    beforeSend: function()
			    {
			    	console.log('Startar');
			    	startTime = new Date().getTime();
			    },
			    success: function(data) {
				    endTime = new Date().getTime();
				    totalTime = endTime - startTime;
				   	var row = {};
					row.app = app;
					row.operation = operation;
					row.totalTime = totalTime;
					row.run = i+1;
					row.date = new Date();
				    console.log(data);
				    console.log(endTime - startTime);
				    times.push(row);
				    console.log('Klar');
			    },
			    error: function(err) {
			        console.log(err);
			    },
			    complete: function()
			    {
			    	i++;
			    	if(i < 3)
			    	{	console.log(i);
			    		makeCall();
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