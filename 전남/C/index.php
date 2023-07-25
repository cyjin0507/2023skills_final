<?php
session_start();

define('__DS', DIRECTORY_SEPARATOR);
define('__ROOT', dirname(__DIR__) . __DS . 'htdocs');
define('__SRC', __ROOT . __DS . 'src');
define('__VIEWS', __SRC . __DS . 'view');
define('__JSON', __ROOT . __DS . 'resources' . __DS . 'json' . __DS);

function myLoader($name)
{
    require_once(__ROOT . __DS . str_replace("\\" , "/" , $name) . ".php");
}

spl_autoload_register("myLoader");

require_once __ROOT . __DS . 'lib.php';
require_once __ROOT . __DS . 'web.php';

src\App\Route::init();