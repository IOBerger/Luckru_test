<?php
$array = [ 	
    [
        'name' => 'Бергер Ирина Олеговна',
        'phone' => '+79226179017', 
        'comments' => 'номер хорошего человека'
    ],[
        'name' => 'Вернер Софья Вениаминовна',
        'phone' => '+79226179019', 
        'comments' => 'номер ещё хорошего человека'
    ],[
        'name' => 'Штирлиц Макс',
        'phone' => '+79226179010', 
        'comments' => 'номер Штирлица'
    ],[
        'name' => 'Лалуленков Лелуш Ламперуж',
        'phone' => '+79226179014', 
        'comments' => 'номер аниме-персонажа'
    ]
];
 
$json = json_encode($array, JSON_UNESCAPED_UNICODE);
header('Content-Type: application/json');
echo $json;

?>