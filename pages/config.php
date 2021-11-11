<?php

//база данных
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'luckru';

//проверка данных на соответствие требованиям
function checkData($name,$phone){
    $phoneOK=false;
    $nameOK=false;
    if(preg_match('/^\s*((\+7)|8)\s*\(?\s*\d{3}\s*\)?\s*\d{3}\s*\-?\d{2}\s*\-?\d{2}\s*$/', $phone)===1)
        $phoneOK=true;
    if($name)
        $nameOK=true;
    return $phoneOK===true && $nameOK===true;
}

?>