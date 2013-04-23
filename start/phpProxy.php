<?php

$method = $_SERVER['REQUEST_METHOD'];

	$url = $_POST['url'];

	$curl=curl_init();
	
	curl_setopt_array($curl, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => $url,
    	CURLOPT_USERAGENT => 'Codular Sample cURL Request'
	));

	$result = curl_exec($curl);
	curl_close($curl);

	echo $result;
?>