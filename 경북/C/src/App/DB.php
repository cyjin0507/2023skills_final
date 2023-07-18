<?php


namespace src\App;


class DB {
    private static $db = null;
    

    private static function getDB() {
        if(is_null(self::$db)) {
            self::$db = new \PDO(
                "mysql:host=localhost; dbname=gyeongbuk2023; charset=utf8mb4;",
                "root",
                ""
            );
        }
        return self::$db;
    }

    public static function execute($sql , $data = []) {
        $p = self::getDB()->prepare($sql);
        $p->execute($data);
        return $p;
    }

    public static function fetch($sql , $data = [] , $mode = \PDO::FETCH_OBJ) {
        return self::execute($sql , $data)->fetch($mode);
    }
    public static function fetchAll($sql , $data = [] , $mode = \PDO::FETCH_OBJ) {
        return self::execute($sql , $data)->fetchAll($mode);
    }
}