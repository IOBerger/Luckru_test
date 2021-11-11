<?php

//выставляем заголовок
header('Content-Type: application/json');
//включаем конфигурационный файл
include('config.php');
//получаем данные и конвертируем
$jsonStr = file_get_contents('php://input');
$jsonArr = json_decode($jsonStr,true);
$id=$jsonArr['id'];
if($jsonArr===null)
    die('{"code": 1}');
//приводим идентификатор к числу
$id=(int)$id;
//проверям, правилен ли идентификатор
if($id<=0)
    die('{"code": 1}');
//удаляем запись
$conn = new mysqli($host, $username, $password, $database);
if($conn->connect_error){
    $array=['code'=>2];//код 2 обозначает ошибку бд
}
$stmt = $conn->prepare("DELETE FROM phonebook WHERE id=?");
$stmt->bind_param("i", $id);
$result=$stmt->execute();
if($result){
    $array=['code'=>0];//код 0 обозначает, что всё в порядке
}else{
    $array=['code'=>2];
}
$conn->close();  
//кодируем и посылаем
$json = json_encode($array, JSON_UNESCAPED_UNICODE);
echo $json;

?>