<?php
	function ConnectToDb()
	{
		# Creates new Mongo Object and connects to the db
		$connection = new Mongo();
		$db = $connection->selectDB('exjobb');
		$dbInfo = Array();
		$dbInfo[0] = $db;
		$dbInfo[1] = $connection;
		return $dbInfo;
	}

	# Terminates the connections, takes one connection object.
	function CloseDb($connection)
	{
		$connection->close();
	}
?>