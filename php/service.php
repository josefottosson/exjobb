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
		return $cities;
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
		return $cities;
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
		return $numbers;
	}

	public static function ReadFile()
	{
		$file = file_get_contents("exjobb.json");
		echo "File read";
	}

	public static function ReadAndSaveNew()
	{
		$file = 'exjobb.json';
		$file_contents = file_get_contents($file);
		$file_contents = preg_replace('/,\s"_id"\:\s"\d*"/',"", $file_contents);
		file_put_contents('exjobb2.json',$file_contents);
		echo "File read and saved as new";
		return "File read";
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
			if($cityObj->city == strtoupper($cityObj->city))
			{	
				$cityObj->city = strtolower($cityObj->city);
			}
			else
			{
				$cityObj->city = strtoupper($cityObj->city);
			}
			
			$collection->save($cityObj);
		}

		CloseDb($conn);
		return "Select And Update Done";
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
		echo "Sparade i databasen";
	}

	public static function GetData($method)
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('testData');
		//Query som letar efter en method med både methodnamnet + methodnamnet med ett slash(Djangofix)
		$query = array('$or' => array(
  			array("operation" => $method),
  			array("operation" => $method . "/")
		));
		$cursor = $collection->find($query);
		$testData = iterator_to_array($cursor);

		echo json_encode($testData);
	}

	public static function Test()
	{
		echo "Test av GetAllCities - Skall returnera 29470 rader<br/>";
		$cities = Service::GetAllCities();
		$citiesArray = json_decode($cities, true);
		if(count($citiesArray) == 29470)
		{
			echo count($citiesArray) . " rader returnerade SUCCESS<br/>";
		}
		else
		{
			echo "Testet failade";
		}
		echo "Test av GetAllCitiesWhere - Skall returnera 567 rader<br/>";
		$cities = Service::GetAllCitiesWhere();
		$citiesArray = json_decode($cities, true);
		if(count($citiesArray) == 567)
		{
			echo count($citiesArray) . " rader returnerade SUCCESS <br/>";
		}
		else
		{
			echo "Testet failade";
		}
		echo "Test av CalculateModulus - Skall returnera en array med 3333334 element<br/>";
		$numbers = Service::CalculateModulus();
		if(count($numbers) == 3333334)
		{
			echo count($numbers) . " array returnerad SUCCESS<br/>";
		}
		else
		{
			echo "Testet failade";
		}

		//Välj första raden från databasen.
		echo "Test av SelectAndUpdate - Staden skall bli lower/uppercase<br/>";
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('cities');

		$query = array( 'population' => array( '$lt' => 10000 ) );
		$cursor = $collection->findOne( $query );

		$city = json_decode(json_encode($cursor));

		echo "Kör SelectAndUpdate <br/>";
		Service::SelectAndUpdate();

		$cursor = $collection->findOne( $query );
		CloseDb($conn);

		$city2 = json_decode(json_encode($cursor));

		if($city->city == strtolower($city->city))
		{
			if($city2->city == strtoupper($city2->city))
			{
				echo $city->city . "</br>";
				echo $city2->city;
				echo " SUCCESS";
			}
			else
			{
				echo "Test failade";
			}
		}
		else
		{
			if($city2->city == strtolower($city2->city))
			{
				echo $city->city . "</br>";
				echo $city2->city;
				echo " SUCCESS";
			}
			else
			{
				echo "Test failade";
			}
		}

	}


}

?>