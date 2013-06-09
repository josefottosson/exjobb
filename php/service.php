<?php
require_once('City.php');
require_once('Connect.php');

class Service {

	public static function GetAllCities()
	{	
		# Connects to db
		$dbInfo = ConnectToDb();
		# Creates db object and connection object
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		# Chooses collection
		$collection = $db->selectCollection('cities');
		# Creates the cursor
		$cursor = $collection->find();
		# Sets a limit higher than maximum number of rows in the db, just to be sure.
		$cursor->limit( 50000 );
		# Turns the cursor into an array
		$cities = iterator_to_array($cursor);
		# Json encodes it
		$cities = json_encode($cities);
		# Closes the db connection
		CloseDb($conn);
		# Echo the json.
		echo $cities;
		//return $cities;
	}

	public static function GetAllCitiesWhere() 
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		
		$collection = $db->selectCollection('cities');
		# Builds the Where condition
		$query = array( "state" => "AL" );
		$cursor = $collection->find( $query );
		$cursor->limit( 50000 );
		$cities = iterator_to_array($cursor);
		$cities = json_encode($cities);
		CloseDb($conn);
		echo $cities;
		//return $cities;
	}

	public static function CalculateModulus()
	{
		$numbers = array();
		# Loops from 0 to ten millions
		for ($i=0; $i < 10000000; $i++) 
		{
			if($i % 3 == 0)
			{
				$numbers[] = $i;
			}
		}
		echo count($numbers) . " returnerade";
		//return $numbers;
	}

	public static function ReadFile()
	{
		# Reads the file into a string
		$file = file_get_contents("exjobb.json");
		echo "File read";
	}

	public static function ReadAndSaveNew()
	{
		$file = 'exjobb.json';
		$file_contents = file_get_contents($file);
		# Replaces all "_id" to "id"
		$file_contents = preg_replace('/"_id"/','"id"', $file_contents);
		# Saves the new file
		file_put_contents('exjobb2.json',$file_contents);
		echo "File read and saved as new";
		//return "File read";
	}

	public static function SelectAndUpdate()
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('cities');
		#Creates the query
		$query = array( 'population' => array( '$lt' => 10000 ) );
		$cursor = $collection->find($query);
		$citiesArray = iterator_to_array($cursor);

		foreach ($citiesArray as $city) 
		{
			# Creates a new city object
			$cityObj = new City($city["city"],$city["loc"], $city["population"], $city["state"], $city["_id"]);
			# If city name is in uppercase, make it lowercase
			if($cityObj->city == strtoupper($cityObj->city))
			{	
				$cityObj->city = strtolower($cityObj->city);
			}
			# Else make it uppercase
			else
			{
				$cityObj->city = strtoupper($cityObj->city);
			}
			# Save the object.
			$collection->save($cityObj);
		}

		CloseDb($conn);
		echo "Select And Update done";
		//return "Select And Update Done";
	}

	# Saves an array to the DB. Prepared for more than one item at a time.
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

	# Collects data from the DB
	public static function GetData($method)
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('testData');
		# The slash is added just because Django doesn't like URLS ending without it.
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
		echo "<h2>ÄNDRA CONTROLLERMETODERNA TILL RETURN ISTÄLLET FÖR ECHO INNAN TESTEN.</h2><br/>";

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

		echo "Test av SelectAndUpdate - Staden skall bli lower/uppercase<br/>";
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('cities');
		//Välj en rad ifrån databasen med befolkning under 10000
		$query = array( 'population' => array( '$lt' => 10000 ) );
		$cursor = $collection->findOne( $query );
		//Spara första staden
		$city = json_decode(json_encode($cursor));

		//Kör SelectAndUpdate
		echo "Kör SelectAndUpdate <br/>";
		Service::SelectAndUpdate();

		$cursor = $collection->findOne( $query );
		CloseDb($conn);
		//Spara andra staden
		$city2 = json_decode(json_encode($cursor));

		//Kolla om staden har ändrats till Uppercase/lowercase
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