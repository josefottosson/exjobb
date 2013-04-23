var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var querystring = require("querystring");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<h1>Hello from NODEJS</h1>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function show(response) {
  
}

function GetAllCities(response)
{
var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
new mongodb.Db('exjobb', server, {}).open(function (error, client) {
  if (error) throw error;
  var collection = new mongodb.Collection(client, 'cities');
  var test = collection.find();
  console.log(test);
  console.log('hej');

});
    
}

exports.start = start;
exports.GetAllCities = GetAllCities;