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
  console.log('Request recieved');
  //Choose DB
  var databaseUrl = "exjobb";
  //Choose collection
  var collections = ["cities"]
  //Connect to the db, require mongojs
  var db = require("mongojs").connect(databaseUrl, collections);
  //Select all cities from the db, respond in the callback
  db.cities.find(function(err, cities) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(cities.length + " rows selected from the Database");
    db.close();
  });
}

function GetAllCitiesWhere(response)
{
  console.log('Request recieved');
  var databaseUrl = "exjobb";
  var collections = ["cities"]
  var db = require("mongojs").connect(databaseUrl, collections);
  db.cities.find({state: "AL"}, function(err, cities) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(cities.length + " rows selected from the Database");
    response.end();
    db.close();
  }); 
}

//sets handlers to corresponding method
exports.start = start;
exports.GetAllCities = GetAllCities;
exports.GetAllCitiesWhere = GetAllCitiesWhere;