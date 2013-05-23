var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//register handlers - one handle corresponds to a request
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/GetAllCities"] = requestHandlers.GetAllCities;
handle["/GetAllCitiesWhere"] = requestHandlers.GetAllCitiesWhere;
handle["/CalculateModulus"] = requestHandlers.CalculateModulus;
handle["/ReadFile"] = requestHandlers.ReadFile;
handle["/ReadAndSaveNew"] = requestHandlers.ReadAndSaveNew;
handle["/SelectAndUpdate"] = requestHandlers.SelectAndUpdate;
handle["/Test"] = requestHandlers.Test;

server.start(router.route, handle);