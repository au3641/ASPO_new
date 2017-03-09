<?php

$sql_conn = new mysqli(Config::$MYSQL_HOST, 
					Config::$MYSQL_USER,
					Config::$MYSQL_PWD, 
					Config::$MYSQL_DBNAME,
					Config::$MYSQL_PORT);
					
$sql_conn->set_charset("utf8");

if ($sql_conn->connect_errno)
    echo "Failed to connect to MySQL: (" . $sql_conn->connect_errno . ") " . $sql_conn->connect_error;

?>