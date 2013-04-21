<?php

$method = $_SERVER['REQUEST_METHOD'];

	$url = $_POST['url'];
	

	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($url));
 
	$result = curl_exec($ch);
	curl_close($ch);

	echo $result;
?>