<?php
	function ConnectToDb()
	{
		$connection = new Mongo();
		$db = $connection->selectDB('exjobb');
		$dbInfo = Array();
		$dbInfo[0] = $db;
		$dbInfo[1] = $connection;
		return $dbInfo;
	}

	function CloseDb($connection)
	{
		$connection->close();
	}
?>