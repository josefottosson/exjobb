<?php

$method = $_SERVER['REQUEST_METHOD'];

	$url = $_POST['url'];

	$curl=curl_init();
	
	curl_setopt_array($curl, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => $url,
    	CURLOPT_USERAGENT => 'Josefs PHPPROXY'
	));

	$result = curl_exec($curl);

	$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	if($httpCode == 0)
	{
		echo "Server is down?";
		return;
	}

	curl_close($curl);

	echo $result;
?>