<?php

$method = $_SERVER['REQUEST_METHOD'];

	$url = $_POST['url'];

	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL, $url);
	curl_setopt($curl,CURLOPT_POST, TRUE);

	if(isset($_POST['PHP']))
	{
		$params = array('a' => 'php');
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
	}
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
 
	$result = curl_exec($curl);
	curl_close($curl);

	echo $result;
?>