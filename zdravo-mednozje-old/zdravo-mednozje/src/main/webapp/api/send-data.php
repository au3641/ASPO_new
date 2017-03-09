<?php

header('Content-Type: text/html; charset=utf-8');

require('config.php');
require('init-sql.php');

require('user-answer.class.php');

$postdata = file_get_contents("php://input");

$data = json_decode($postdata, true);
//var_dump($data);

$usid = uniqid('', true);
$time = date('Y-m-d H:i:s', time());

foreach($data as $ans)
{
	$insert = $sql_conn->prepare("INSERT INTO user_answers VALUES(?, ?, ?, ?)");
	$insert->bind_param('siis', $usid, $ans["questionId"], $ans["answerId"], $time);
		
	$insert->execute();
}

require('close-sql.php');

?>