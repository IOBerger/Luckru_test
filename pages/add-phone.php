<?php

$answer=['result'=>'1'];

$json = json_encode($answer, JSON_UNESCAPED_UNICODE);
header('Content-Type: application/json');
echo $json;

?>