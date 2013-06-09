<?php
require_once('Service.php');
class Controller {

	# Simple Router
	public function doControll($method, $server) {

		if(isset($server["PATH_INFO"])) {
			$queryString = $server["PATH_INFO"];
		}
		else {
			$queryString = $server["QUERY_STRING"];
		}

		# Checks which url to route to - default = bad request
		$type = $_SERVER["REQUEST_URI"];
		$fields = $_SERVER["REQUEST_URI"];
		$params = explode("/", $queryString);
		unset($params[0]);
		$params = array_values($params);
		$params = $params[0];

		switch($params) {

			case "GetAllCities":
			Service::GetAllCities();
			break;

			case "GetAllCitiesWhere":
			Service::GetAllCitiesWhere();
			break;

			case "CalculateModulus":
			Service::CalculateModulus();
			break;

			case "ReadFile":
			Service::ReadFile();
			break;

			case "ReadAndSaveNew":
			Service::ReadAndSaveNew();
			break;

			case "insert":
			Service::SaveToDb($_POST["times"]);
			break;

			case "SelectAndUpdate":
			Service::SelectAndUpdate();
			break;

			case "GetData":
			$method = explode("?", $fields);
			$method = $method[1];
			Service::GetData($method);
			break;

			case "Test":
			Service::Test();
			break;

			default:
				echo "FELAKTIG REQUEST";
				break;

		}	
	}
}



?>