<?php
	function ConnectToDb()
	{
		//Create new Mongo instance
		$connection = new Mongo();
		//Choose database
		$db = $connection->selectDB('exjobb');
		$dbInfo = Array();
		$dbInfo[0] = $db;
		$dbInfo[1] = $connection;
		//Returns array with db object and connection object
		return $dbInfo;
	}

	function CloseDb($connection)
	{
		$connection->close();
	}
?>