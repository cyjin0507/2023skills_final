<?php

$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ];
$db = new PDO("mysql:host=localhost; dbname=23chbuk; charset=utf8mb4",'root','',$options);

session_start();
date_default_timezone_set("Asia/Seoul");

$ids = isset($_SESSION['ids']) ? $_SESSION['ids'] : "";
$names = isset($_SESSION['names']) ? $_SESSION['names'] : "";
$id_chk = isset($_SESSION['id_chk']) ? $_SESSION['id_chk'] : ""; //이게 맞나 확인

function sql($sql, $b=null){
    $rs = $GLOBALS['db']->prepare($sql);
    $rs -> execute($b);
    return $rs;
}

function fetch($sql, $b=null){
    $rs = sql($sql, $b);
    $rs = $rs->fetch();
    return $rs;
}

function fetchAll($sql, $b=null){
    $rs = sql($sql, $b);
    $rs = $rs->fetchAll();
    return $rs;
}

function row($sql, $b=null){
    $rs = sql($sql, $b);
    $rs = $rs->rowCount();
    return $rs;
}

function alert($msg){
    echo "<script>alert('$msg')</script>";
}

function move($url){
    echo "<script>location.replace('$url')</script>";
    exit();
}

function back(){
    echo "<script>history.back()</script>";
    exit();
}

if(!isset($_GET['sh'])){
    $page_set = "index";
} else {
    $url = explode("/", $_GET['sh']);
    $page_set = isset($url[0]) ? $url[0] : "";
    $no = isset($url[1]) ? $url[1] : 1;
    $page = isset($url[2]) ? $url[2] : "";
}

extract($_POST);