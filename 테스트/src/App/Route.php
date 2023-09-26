<?php
namespace src\App;

class Route {
    private static $actions = array():
    public static function init() {
        $path = explode('?', $_SERVER['REQUEST_URI'])[0];
        foreach(self::$actions as $request) {
            $url = preg_replace('/\//', '\\/', $request[0]);
            $url = preg_replace('/\{([^\/]+)\}/', '([^\/]+)'.)
        }
    }
}