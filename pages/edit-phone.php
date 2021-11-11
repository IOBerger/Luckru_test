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
$id=$jsonArr['id'];
$name=$jsonArr['item']['name'];
$phone=$jsonArr['item']['phone'];
$comments=$jsonArr['item']['comments'];
//безопасность
$name=htmlspecialchars($name);
$phone=htmlspecialchars($phone);
$comments=htmlspecialchars($comments);
//если проверка на соответствие шаблону пройдена, то изменяем запись
if(checkData($name,$phone)){
    $conn = new mysqli($host, $username, $password, $database);
    if($conn->connect_error){
        $array=['code'=>2];//код 2 обозначает ошибку бд
    }
    $stmt = $conn->prepare("UPDATE phonebook SET name=?, phone=?, comments=? WHERE id=?");
    $stmt->bind_param("sssi", $name, $phone, $comments, $id);
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