<?php
namespace src\Controller;
use src\App\DB;

class ClientController {
    public function goods() {
        if(!isset($_SESSION['user'])) {
            redirect("로그인 후 이용해주세요.", "/login");
        } else if($_SESSION['user']->id == "admin") {
            redirect("일반 사용자 전용 페이지입니다.", "/");
        }

        view('goods');
    }

    public function goodsGet() {
        $data = DB::fetchAll("SELECT * FROM goods");

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function goodsPurchase() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

        $idx = $jsonData['idx'];
        $count = $jsonData['count'];

        $data = "";

        $check = DB::fetch("SELECT * FROM basket where gidx=?", [$idx]);
        if($check) {
            $data = DB::execute("UPDATE basket SET count=? WHERE idx=?", [$count+$check->count, $check->idx]);
        } else {
            $data = DB::execute("INSERT INTO `basket`(`uidx`, `gidx`, `count`) VALUES (?,?,?)",
            [$_SESSION['user']->idx, $idx, $count]);
        }

        

        // $count = DB::fetch("SELECT * FROM goods where idx=?", [$jsonData['idx']])->stock;
        // $data2 = DB::execute("UPDATE goods SET stock=? where idx=?", [$count - $jsonData['count'],$jsonData['idx']]);

        if($data) {
            echo true;
        } else {
            echo false;
        }

    }

    public function basket() {
        if(!isset($_SESSION['user'])) {
            redirect("로그인 후 이용해주세요.", "/login");
        } else if($_SESSION['user']->id == "admin") {
            redirect("일반 사용자 전용 페이지입니다.", "/");
        }

        view('basket');
    }

    public function basketGet() {
        $data = DB::fetchAll("SELECT g.*, b.count FROM `basket` b, goods g where b.gidx = g.idx and b.uidx=?;",
        [$_SESSION['user']->idx]);

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function basketReset() {
        $data = DB::execute("DELETE FROM basket where uidx=?", [$_SESSION['user']->idx]);
        if($data) {
            return true;
        } else {
            return false;
        }
    }

    public function orderProcess() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        $idxArr = json_decode($jsonData['idx']);


        foreach($idxArr as $key=>$value) {
            $count = DB::fetch("SELECT * FROM goods where idx=?", [$idxArr[$key]->idx])->stock;
            $data = DB::execute("UPDATE goods SET stock=? WHERE idx=?", [$count - $idxArr[$key]->count ,$idxArr[$key]->idx]);
            $data2 = DB::execute("DELETE FROM goods where idx=?", [$idxArr[$key]->idx]);
            if(!$data || !$data2) {
                return false;
            }
        }

        return true;
    }

}