<?php
namespace src\Controller;
use src\App\DB;

class AccoController {
    public function accoRegister() {
        if($_SESSION['user']->type != "boss") {
            back("숙박업소회원만 이용가능합니다.");
        }

        $data = DB::fetch("SELECT * FROM acco where uidx=?", [$_SESSION['user']->idx]);
        if($data) {
            view('accoRegister', ['data'=>$data]);
        } else {
            view('accoRegister');
        }

    }

    public function accoRegisterProcess() {
        extract($_POST);

        if($name=="" || $loc == "") {
            back("필수 입력값을 입력해주세요.");
        }

        $image = $_FILES['file'];
        
        $imageName = rand() . $image['name'];
        $tmp = $image['tmp_name'];

        if($tmp != "") {
            move_uploaded_file($tmp, __UPLOAD . $imageName);
        } else {
            $imageName = "";
        }

        $data = DB::execute("INSERT INTO acco (uidx, name, image, loc, type) VALUES(?,?,?,?,?)",
        [$_SESSION['user']->idx, $name, $imageName, $loc, $type]);

        if($data) {
            redirect('숙박업소 등록이 완료되었습니다.', '/');
        }

    }

    public function accoModifyProcess() {
        extract($_POST);
        // if($name=="" || $loc == "") {
        //     back("필수 입력값을 입력해주세요.");
        // }

        $image = $_FILES['file'];
        
        $imageName = rand() . $image['name'];
        $tmp = $image['tmp_name'];
        
        if($tmp != "") {
            move_uploaded_file($tmp, __UPLOAD . $imageName);
        } else {
            $imageName = DB::fetch("SELECT * FROM acco where uidx=?", [$_SESSION['user']->idx])->image;
        }
 

        $data = DB::execute("UPDATE acco SET name=?, image=?, loc=?, type=? where uidx=?",
        [$name, $imageName, $loc, $type, $_SESSION['user']->idx]);

        if($data) {
            back("숙박업소 정보가 수정되었습니다.");
        }

    }

    public function roomRegister() {
        if($_SESSION['user']->type != "boss") {
            back("숙박업소회원만 이용가능합니다.");
        }

        $check = DB::fetch("SELECT * FROM acco where uidx=?", [$_SESSION['user']->idx]);
        if(!$check) {
            back("숙박업소 등록 회원만 이용가능합니다.");
        }

        view('roomRegister');

    }

    public function roomRegisterProcess() {
        extract($_POST);

        $images = $_FILES['file'];

        $length = count($images['name']);
        if($length > 4 || $length <= 0) {
            back("이미지는 1~4개 업로드 가능합니다.");
        }

        $imgArr = [];

        for($i=0; $i<$length; $i++) {
            $imageName = rand() . $images['name'][$i];
            $tmp = $images['tmp_name'][$i];
            move_uploaded_file($tmp, __UPLOAD . $imageName);
            array_push($imgArr, $imageName);
        }

        $aidx = DB::fetch("SELECT * FROM acco where uidx=?", [$_SESSION['user']->idx])->idx;

        $data = DB::execute("INSERT INTO `room`(`uidx`, `aidx`, `name`, `images`, `price`, `introduce`) VALUES (?,?,?,?,?,?)",
        [$_SESSION['user']->idx, $aidx, $name, json_encode($imgArr), $price, $introduce]);

        if($data) {
            redirect("객실 등록 완료", "/");
        }

    }

    public function roomList() {
        if($_SESSION['user']->type != "boss") {
            back("숙박업소회원만 이용가능합니다.");
        }

        $list = DB::fetchAll("SELECT * FROM room where uidx=?", [$_SESSION['user']->idx]);
        view('roomList', ['list'=>$list]);
    }

    // 나중에 수정해야함!!!!!!
    public function roomDelete($idx) {
        $check = DB::fetch("SELECT * FROM reservation where ridx=? and start<=? and end>=?",
        [$idx, date("Y-m-d", time()), date("Y-m-d", time())]);

        if($check) {
            back("이미 예약이 된 객실입니다.");
        }

        $data = DB::execute("DELETE FROM `room` WHERE idx=?", [$idx]);
        if($data) {
            back("객실이 삭제되었습니다.");
        }
    }

    public function reservation() {
        $list = DB::fetchAll("select DISTINCT r.start, r.end, u.id, u.name, u.tel from acco a, reservation r, room b, users u where a.idx = b.aidx and r.ridx and b.idx and u.idx = b.uidx and r.uidx=?", [$_SESSION['user']->idx]);
        view('reservation', ['list'=>$list]);
    }

}