<?php
namespace src\Controller;
use src\App\DB;

class TourController {
    public function tour() {
        view('tour');
    }

    public function busInfoGet() {
        $data = DB::fetchAll("SELECT * FROM bus where accept=2 order by date, time");
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function seatInfoGet($idx) {
        $data = DB::fetch("SELECT * FROM bus where idx=?", [$idx]);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function payment() {
        extract($_POST);
        $data = DB::fetch("SELECT * FROM bus where idx=?", [$idx]);
        view('payment',['data'=>$data, 'bidx'=>$idx, 'seat'=>$reserv, 'startLoc'=>$start, 'time'=>$time]);

    }

    public function reservCheck($idx) {
        $data = DB::fetchAll("SELECT * FROM reservation where bidx=?", [$idx]);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function reservProcess() {
        extract($_POST);
        $data = DB::execute("INSERT INTO `reservation`(`uidx`, `bidx`, `seat`, `start`, `reserv_time`, `type`, `price`) VALUES (?,?,?,?,?,?,?)",
        [$_SESSION['user']->idx, $idx, $seat, $start, $reserv_time, $type, $price]);
        if($data) {
            redirect("예약성공", "/tour");
        }
    }

}