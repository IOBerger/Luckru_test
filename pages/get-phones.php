<?php
header('Content-Type: application/json');

//включаем конфигурационный файл
include('config.php');

//достаём записи
$conn = new mysqli($host, $username, $password, $database);
if($conn->connect_error){
    $array=['code'=>2];
}

$sql = 'SELECT * FROM phonebook';
if($result = $conn->query($sql)){
    $i=0;
    foreach($result as $row){
        $array[$i]=$row;
        $i++;
    }
}else{
    $array=['code'=>2];
}
$conn->close();

//кодируем и посылаем
$json = json_encode($array, JSON_UNESCAPED_UNICODE);
echo $json;

?>