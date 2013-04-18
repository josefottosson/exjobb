<?php
require_once('Service.php');
class Controller {

	public function doControll($method, $server) {

		if(isset($server["PATH_INFO"])) {
			$queryString = $server["PATH_INFO"];
		}
		else {
			$queryString = $server["QUERY_STRING"];
		}

		$type = $_SERVER["REQUEST_URI"];
		$fields = $_SERVER["REQUEST_URI"];
		$params = explode("/", $queryString);
		unset($params[0]);
		$params = array_values($params);
		$params = $params[0];

		switch($params) {

			case "AllPosts":
			Service::SelectAllPosts();
			break;

			case "AllPostsWhere":
			Service::SelectAllPostsWhere();
			break;

			case "insert":
			Service::SaveToDb($_POST["times"]);
			break;

			default:
				return null;
				break;

		}	
	}
}



?>