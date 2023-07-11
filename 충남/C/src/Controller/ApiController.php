<?php
namespace src\Controller;
use src\App\DB;

class ApiController {
    public function idCheckAPI() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        
        $id = $jsonData['id'];

        $check = DB::fetch("SELECT * FROM users where id=?", [$id]);
        if($check || $id=='admin') {
            $json = [
                "result" => "unable",
                "message" => "사용할 수 없는 아이디 입니다.",
                "data" => []
            ];
        } else {
            $json = [
                "result" => "able",
                "message" => "사용 가능한 아이디 입니다.",
                "data" => []
            ];
        }



        echo json_encode($json, JSON_UNESCAPED_UNICODE);

    }

    public function joinAPI() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        $id = $jsonData['id'];
        $password = $jsonData['password'];
        $name = $jsonData['name'];
        $tel = $jsonData['tel'];
        $addr = $jsonData['addr'];

        $data = DB::execute("INSERT INTO users(id, password, name, tel, addr) VALUES(?,?,?,?,?)",
        [$id, $password, $name, $tel, $addr]);

        $json = "";
        if($data) {
            $json = [
                "result" => "success",
                "message" => "정상적으로 가입 되었습니다.",
                "data" => []
            ];
        } else {
            $json = [
                "result" => "fail",
                "message" => "회원가입을 할 수 없습니다. 관리자에게 문의해 주세요.",
                "data" => []
            ];
        }

        echo json_encode($json);

    }

    public function loginAPI() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        
        $id = $jsonData['id'];
        $password = $jsonData['password'];

        $data = DB::fetch("SELECT * FROM users where id=? and password=?", [$id, $password]);

        $json = "";
        if($data) {
            $json = [
                "result" => "success",
                "message" => "어서오세요.",
                "data" => [
                    "id" => $id,
                    "name" => $data->name,
                    "tel" => $data->tel
                ]
            ];
            $_SESSION['user'] = $data;
        } else {
            $json = [
                "result" => "fail",
                "message" => "아이디 또는 비밀번호가 일치하지 않습니다.",
                "data" => []
            ];
        }

        echo json_encode($json);
    }

    public function recommandAddAPI() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

        $data = $jsonData['data'];

        foreach($data as $key=>$value) {
            $stats = DB::fetch("SELECT * FROM stats where name=?", [$data[$key]['name']]);
            DB::execute("UPDATE `stats` SET count=?, score=? where name=?", [$stats->count+1, $stats->score+5-$key,$data[$key]['name']]);
        }

        // echo json_encode($data[0], JSON_UNESCAPED_UNICODE);
        // echo $data[0]['name'];

        $db = DB::execute("INSERT INTO recommand (uidx, uid,recommand) VALUES(?,?,?)", [$_SESSION['user']->idx, $_SESSION['user']->id, json_encode($data, JSON_UNESCAPED_UNICODE)]);

    }

    public function recommandGetAPI() {
        $db = DB::fetchAll("SELECT * FROM recommand");

        
        $list = [];
        foreach($db as $key=>$value) {
            array_push($list, $db[$key]);
        }
        
        $json = [
            "result" => "success",
            "message" => "조회성공",
            "data" => $list
        ];

        echo json_encode($json, JSON_UNESCAPED_UNICODE);
    }
    
}