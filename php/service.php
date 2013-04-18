<?php
require_once('City.php');
require_once('Connect.php');

class Service {

	public static function SelectAllPosts()
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		$collection = $db->selectCollection('city');
		$cities = array();
		$cursor = $collection->find();
		foreach ($cursor as $id => $obj) 
		{
	    	$city = new City($obj['city'], $obj['loc'], $obj['population'], $obj['state'], $obj['_id']);
	    	array_push($cities, $city);
		}
		CloseDb($conn);
		echo "Hämtade rader: " . count($cities); 
		return $cities;
				
	}

	public static function SelectAllPostsWhere() 
	{
		$dbInfo = ConnectToDb();
		$db = $dbInfo[0];
		$conn = $dbInfo[1];
		
		$collection = $db->selectCollection('city');

		$query = array( "state" => "AL" );
		$cities = array();
		$cursor = $collection->find( $query );

		while( $cursor->hasNext() ) 
		{
    		$std = json_decode(json_encode($cursor->getNext()), FALSE);
    		$city = new City($std->city, $std->loc, $std->population, $std->state, $std->_id);
    		array_push($cities, $city);
		}
		CloseDb($conn);
		echo "Hämtade rader: " . count($cities); 
		return $cities;
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