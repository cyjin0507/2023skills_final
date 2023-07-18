<?php

use src\App\Route;


session_start();

date_default_timezone_set("Asia/Seoul");

define("__DS", "/");
define("__ROOT", dirname(__DIR__)  . __DS . "htdocs");
define("__SRC",__ROOT . __DS . 'src' );
define("__VIEWS",__SRC . __DS . 'Views' );

function myLoader($name) {
    require_once(__ROOT . __DS . str_replace("\\", "/", $name)) .  ".php";
}

spl_autoload_register("myLoader");

require_once(__ROOT . __DS . "web.php");
require_once(__ROOT . __DS . "lib.php");

Route::init();