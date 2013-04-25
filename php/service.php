<?php
require_once('City.php');
require_once('Connect.php');

class Service {

	public static function GetAllCities()
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('cities');
		$cursor = $collection->find();

		CloseDb($conn);
		echo "Hämtade rader: " . $cursor->count(); 
	}

	public static function GetAllCitiesWhere() 
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		
		$collection = $db->selectCollection('cities');

		$query = array( "state" => "AL" );
		$cursor = $collection->find( $query );

		CloseDb($conn);
		echo "Hämtade rader: " . $cursor->count(); 
	}

	public static function CalculateModulus()
	{
		$numbers = array();

		for ($i=0; $i < 10000000; $i++) 
		{
			if($i % 3 == 0)
			{
				$numbers[] = $i;
			}
		}
		echo "Modulus klar: " + count($numbers);
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