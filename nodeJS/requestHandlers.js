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
  //Choose DB
  var databaseUrl = "exjobb";
  //Choose collection
  var collections = ["cities"]
  //Connect to the db, require mongojs
  var db = require("mongojs").connect(databaseUrl, collections);
  //Select all cities from the db, respond in the callback
  db.cities.find(function(err, cities) {
    cities = JSON.stringify(cities);
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(cities);
    db.close();
  });
}

function GetAllCitiesWhere(response)
{
  var databaseUrl = "exjobb";
  var collections = ["cities"]
  var db = require("mongojs").connect(databaseUrl, collections);
  db.cities.find({state: "AL"}, function(err, cities) {
    cities = JSON.stringify(cities)
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(cities);
    response.end();
    db.close();
  }); 
}

function CalculateModulus(response)
{
  var numbers = [];
  for(i = 0; i < 10000000; i++)
  {
    if(i % 3 === 0)
    {
      numbers.push(i);
    }
  }
  response.writeHead(200, {"Content-Type": "application/json"});
  response.write("Modulus Done: <br/>" + numbers.length);
  response.end();
}

function ReadFile(response)
{
  fs = require('fs')
  //Reads the file
  fs.readFile('exjobb.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else
  {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write("Fil läst: <br/>");
    response.end();
  }
  });
}

function ReadAndSaveNew(response)
{
  fs = require('fs')
  fs.readFile('exjobb.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var newText = data.replace(/_id/g, 'id');
    fs.writeFile("exjobb2.json", newText, function(){
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write("Fil läst och sparad: <br/>");
      response.end();
    })
  });
}

function SelectAndUpdate(response)
{
  var databaseUrl = "exjobb";
  var collections = ["cities"];
  var db = require("mongojs").connect(databaseUrl, collections);
  //Select all cities with a population less than 10 000
  db.cities.find({population: {$lt: 10000}}, function(err, cities){
    console.log(cities[0]);
    for(var i = 0; i < cities.length; i++)
    {
      //Check if city name is upperCase, if so, change to lowercase
      if(cities[i].city === cities[i].city.toUpperCase())
      {
        cities[i].city = cities[i].city.toLowerCase();
      }
      else
      {
        cities[i].city = cities[i].city.toUpperCase();
      }
      db.cities.save(cities[i]);
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(cities.length + " rows selected and updated");
    response.end();
    db.close();
  });

}

function Test(response)
{

}

//sets handlers to corresponding method
exports.start = start;
exports.GetAllCities = GetAllCities;
exports.GetAllCitiesWhere = GetAllCitiesWhere;
exports.CalculateModulus = CalculateModulus;
exports.ReadFile = ReadFile;
exports.ReadAndSaveNew = ReadAndSaveNew
exports.SelectAndUpdate = SelectAndUpdate;
exports.Test = Test;