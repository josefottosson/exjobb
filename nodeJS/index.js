var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//register handlers - one handle corresponds to a request
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/GetAllCities"] = requestHandlers.GetAllCities;
handle["/GetAllCitiesWhere"] = requestHandlers.GetAllCitiesWhere;


server.start(router.route, handle);