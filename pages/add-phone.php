<?php

//выставляем заголовок
header('Content-Type: application/json');
//включаем конфигурационный файл
include('config.php');
//получаем данные и конвертируем
$jsonStr = file_get_contents('php://input');
$jsonArr = json_decode($jsonStr,true);
if($jsonArr===null)
    die('{"code": 1}');
$name=$jsonArr['name'];
$phone=$jsonArr['phone'];
$comments=$jsonArr['comments'];
//безопасность
$name=htmlspecialchars($name);
$phone=htmlspecialchars($phone);
$comments=htmlspecialchars($comments);
//если проверка на соответствие шаблону пройдена, то добавляем запись
if(checkData($name,$phone)){
    $conn = new mysqli($host, $username, $password, $database);
    if($conn->connect_error){
        $array=['code'=>2];//код 2 обозначает ошибку бд
    }
    $stmt = $conn->prepare("INSERT INTO phonebook (name, phone, comments) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $phone, $comments);
    $result=$stmt->execute();
    if($result){
        $array=['code'=>0];//код 0 обозначает, что всё в порядке
    }else{
        $array=['code'=>2];
    }
    $conn->close();  
}else{
    $array=['code'=>1];//код 1 означает ошибку в данных
}
//кодируем и посылаем
$json = json_encode($array, JSON_UNESCAPED_UNICODE);
echo $json;

?>