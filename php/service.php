<?php
require_once('City.php');
require_once('Connect.php');

class Service {

	public static function GetAllCities()
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('city');
		$cities = array();
		$cursor = $collection->find();

		CloseDb($conn);
		echo "Hämtade rader: " . count($cursor); 
	}

	public static function GetAllCitiesWhere() 
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		
		$collection = $db->selectCollection('city');

		$query = array( "state" => "AL" );
		$cities = array();
		$cursor = $collection->find( $query );

		CloseDb($conn);
		echo "Hämtade rader: " . count($cursor); 
	}

	public static function SaveToDb($postData)
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('testData');

		$data = json_decode(json_encode($postData));

		foreach ($data as $id => $item) 
		{
   			$collection->insert($item);
		}

		CloseDb($conn);
		echo count($data) . " rader sparades i databasen";
	}
}

?>