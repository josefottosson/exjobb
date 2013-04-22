<?php

$method = $_SERVER['REQUEST_METHOD'];

	$url = $_POST['url'];
	
	$params=array(
  'a'=>'text1',
  'b'=>'text2'
);

	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL, $url);
	curl_setopt($curl,CURLOPT_POST, TRUE);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

	curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
 
	$result = curl_exec($curl);
	curl_close($curl);

	echo $result;
?>