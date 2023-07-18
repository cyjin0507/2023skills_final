<?php


namespace src\App;


class Route {
    private static $GET = [];
    private static $POST = [];

    public static function get($url, $actions) {
        self::$GET[] = [$url, $actions];
    }
    public static function post($url, $actions) {
        self::$POST[] = [$url, $actions];
    }

    public static function init() {
        $url = explode("?", $_SERVER['REQUEST_URI'])[0];
        $actions = self::${$_SERVER['REQUEST_METHOD']};

        foreach($actions as $action) {
            $path = preg_replace("/\//", "\\/", $action[0]) ;
            $path = preg_replace("/\{([^\/]+)\}/", "([^\/]+)", $path);
            $path = "/^" . $path . "$/";
            if(preg_match($path, $url, $result)) {
                unset($result[0]);
                $do = explode("@", $action[1]);
                $cont = "src\\Controller\\" . $do[0];
                $ins = new $cont();
                $ins->{$do[1]}(...$result);
                return;
            }
        }

        echo "404";
    }
}