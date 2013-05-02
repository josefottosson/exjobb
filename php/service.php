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
		$cursor->limit( 50000 );
		$cities = iterator_to_array($cursor);
		$cities = json_encode($cities);
		CloseDb($conn);
		echo $cities; 
	}

	public static function GetAllCitiesWhere() 
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		
		$collection = $db->selectCollection('cities');

		$query = array( "state" => "AL" );
		$cursor = $collection->find( $query );
		$cursor->limit( 50000 );
		$cities = iterator_to_array($cursor);
		$cities = json_encode($cities);
		CloseDb($conn);
		echo $cities; 
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

	public static function ReadFile()
	{
		$file = file_get_contents("exjobb.json");
		echo "Fil läst";
	}

	public static function ReadAndSaveNew()
	{
		$file = 'exjobb.json';
		$file_contents = file_get_contents($file);
		$file_contents = preg_replace('/,\s"_id"\:\s"\d*"/',"", $file_contents);
		file_put_contents('exjobb2.json',$file_contents);
	}

	public static function SelectAndUpdate()
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('cities');
		$query = array( 'population' => array( '$lt' => 10000 ) );
		$cursor = $collection->find($query);
		$citiesArray = iterator_to_array($cursor);

		foreach ($citiesArray as $city) 
		{
			$cityObj = new City($city["city"],$city["loc"], $city["population"], $city["state"], $city["_id"]);

			if($cityObj->city === strtoupper($cityObj->city))
			{
				$cityObj->city = strtolower($cityObj->city);
				echo "Lower";
			}
			else
			{
				$cityObj->city = strtoupper($cityObj->city);
				echo "Upper";
			}
			
			$collection->save($cityObj);
		}

		CloseDb($conn);
		echo "Select And Update Done";
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