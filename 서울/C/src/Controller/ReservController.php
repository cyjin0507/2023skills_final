<?php
namespace src\Controller;
use src\App\DB;

class ReservController {
    public function info($date, $cidx, $term) {
        view('info', ["reservDate"=>$date, "cidx"=>$cidx, "term"=>$term]);
    }

    public function reserveGet() {
        $data = DB::fetchAll("SELECT * FROM reservation");
        echo json_encode($data);
    }

    public function reserveDateGet($date) {
        $data = DB::fetchAll("SELECT * FROM reservation where reserv_date=?", [$date]);
        echo json_encode($data);
    }

    public function reserveProcess() {
        extract($_POST);

        $day = substr($reservDate, 0, 7);

        $check = DB::fetchAll("SELECT * FROM `reservation` where reserv_date >= '".$day."-01' and reserv_date <= '".$day."-31' and uidx=?;", [$_SESSION['user']->idx]);

        if(count($check) >= 2) {
            back("월별로 총 2건의 예약이 가능합니다.");
        }

        $data = DB::execute("INSERT INTO `reservation`(`uidx`, `cidx`, `term`, `reserv_date`, `people`, `phone`, `applicant`, `car`) VALUES (?,?,?,?,?,?,?,?)",
        [$_SESSION['user']->idx, $cidx, $term, $reservDate, $people, $phone, $applicant, $car]);

        if($data) {
            redirect("예약완료", "/");
        } else {
            back("실패");
        }

    }
}