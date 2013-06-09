var http = require("http");
var url = require("url");

function start(route, handle) {
  // Request method, runs on every request.
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    // Tries to route the request.
    route(handle, pathname, response, request);
  }
  // Starts the server on port 8888
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;