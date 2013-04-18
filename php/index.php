<?php
require_once('City.php');
require_once('Connect.php');
require_once('Controller.php');

$server = $_SERVER;
$method = $_SERVER["REQUEST_METHOD"]; 
$Controller = new Controller();

$Controller->doControll($method, $server);


?>