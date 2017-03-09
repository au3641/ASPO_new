<?php

header('Content-Type: text/html; charset=utf-8');

require('config.php');
require('init-sql.php');

require('question.class.php');
require('question-answer.class.php');
require('dependency.class.php');

echo json_encode(Question::getAll(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

require('close-sql.php');

?>