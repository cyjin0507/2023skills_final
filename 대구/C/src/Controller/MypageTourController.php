<?php
namespace src\Controller;
use src\App\DB;

class MypageTourController {
    public function tourList($idx) {
        if($idx==0) {
            view('mypage/tourList/busRegister');
        }
        if($idx==1) {
            $check = DB::fetch("SELECT * FROM bus where uidx=?", [$_SESSION['user']->idx]);
            if($check) {
                $busList = DB::fetchAll("SELECT * FROM bus where uidx=?", [$_SESSION['user']->idx]);
                view('mypage/tourList/seatRegister', ['busList'=>$busList]);
            } else {
                back("셔틀버스 등록 후 이용해주세요.");
            }
        }
        if($idx==2) {
            $busList = DB::fetchAll("SELECT * FROM bus where uidx=?", [$_SESSION['user']->idx]);
            view('mypage/tourList/seatList', ['busList'=>$busList]);
        }
        if($idx==3) {
            $busList = DB::fetchAll("SELECT * FROM bus where uidx=? and accept!=0", [$_SESSION['user']->idx]);
            view('mypage/tourList/reservList', ['busList'=>$busList]);
        }
    }

    public function busRegister() {
        extract($_POST);

        if($start==$end ||
        $start==$middle ||
        $end==$middle) {
            back("출발지, 경유지, 도착지는 겹칠 수 없습니다.");
        }

        $busNumber = DB::fetch("SELECT * FROM bus where number=?", [$number]);
        if($busNumber) {
            back("차량번호가 겹침");
        }

        $files = $_FILES['file'];
        $fileName = rand() . time() . $files['name'];
        if($files['name'] != "") {
            move_uploaded_file($files['tmp_name'], __UPLOAD . $fileName);
        }

        $json = '';
        if($type=='승용차') {
            $json = [
                "A01" => false,
                "A02" => false,
                "A03" => false,
            ];
        } else if($type=='SUV') {
            $json = [
                "B01" => false,
                "B02" => false,
                "B03" => false,
                "B04" => false,
                "B05" => false,
            ];
        } else if($type=='승합차') {
            $json = [
                "C01" => false,
                "C02" => false,
                "C03" => false,
                "C04" => false,
                "C05" => false,
                "C06" => false,
                "C07" => false,
                "C08" => false,
                "C09" => false,
            ];
        } else if($type=='버스') {
            $json = [
                "D01" => false,
                "D02" => false,
                "D03" => false,
                "D04" => false,
                "D05" => false,
                "D06" => false,
                "D07" => false,
                "D08" => false,
                "D09" => false,
                "D10" => false,
                "D11" => false,
                "D12" => false,
            ];
        }

        $data = DB::execute("INSERT INTO `bus`(`uidx`, `type`, `start`, `middle`, `end`, `image`, `number`, `begin`, `seat`) VALUES (?,?,?,?,?,?,?,?,?)",
        [$_SESSION['user']->idx, $type, $start, $middle, $end, $fileName, $number, $begin, json_encode($json)]);

        if($data) {
            back("차량등록성공");
        }
    }


    public function seatUpdate() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        $data = $jsonData['data'];
        $idx = $jsonData['idx'];
        

        DB::execute("UPDATE bus SET seat=? where idx=?", [$data, $idx]);
    }

    public function busInfoGet() {
        $data = DB::fetchAll("SELECT * FROM bus where uidx=?", [$_SESSION['user']->idx]);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function busAcceptProcess($idx) {
        $data = DB::execute("UPDATE bus SET accept=1 where idx=?", [$idx]);
        if($data) {
            back("배차 승인 요청되었습니다.");
        }
    }

}