<?php
namespace src\Controller;
use src\App\DB;

class SettingController {
    public function user() {
        $list = [
            [
                "type" => "일반",
                "id" => "u01",
                "password" => "1234",
                "name" => "사용자1"
            ],
            [
                "type" => "일반",
                "id" => "u02",
                "password" => "1234",
                "name" => "사용자2"
            ],
            [
                "type" => "가이드",
                "id" => "g01",
                "password" => "1234",
                "name" => "가이드1"
            ],
            [
                "type" => "가이드",
                "id" => "g02",
                "password" => "1234",
                "name" => "가이드2"
            ],
            [
                "type" => "관리자",
                "id" => "admin",
                "password" => "1234",
                "name" => "관리자"
            ]
        ];

        foreach($list as $key=>$value) {
            DB::execute("INSERT INTO `users`(`id`, `password`, `name`, `type`) VALUES (?,?,?,?)",
            [$list[$key]['id'],$list[$key]['password'],$list[$key]['name'],$list[$key]['type']]);
        }

    }

    public function specialties() {
        $json_file = file_get_contents(__JSON . 'specialties.json');
        $json_parsing = json_decode($json_file)->data;

        foreach($json_parsing as $key=>$value) {
            DB::execute("INSERT INTO `specialties`(`name`, `description`, `point`, `image`) VALUES (?,?,?,?)",
            [$json_parsing[$key]->name,$json_parsing[$key]->description,$json_parsing[$key]->point,$json_parsing[$key]->image]);
        }
    }

}