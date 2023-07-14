<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        view('index');
    }

    public function login() {
        if(isset($_SESSION['user'])) {
            back("로그인 된 유저는 이용할 수 없습니다.");
            return;
        }

        view('login');
    }

    public function join() {
        if(isset($_SESSION['user'])) {
            back("로그인 된 유저는 이용할 수 없습니다.");
            return;
        }
        view('join');
    }

    public function joinProcess() {
        extract($_POST);

        $data = DB::execute("INSERT INTO users (id, password, name, tel, type) VALUES (?,?,?,?,?)",
        [$id, $pw, $name, $tel, $type]);

        $mile = DB::execute("INSERT INTO `mileage`(`uidx`, `grade`, `score`, `update_date`, `change_date`) VALUES (?,?,?,?,?)",
        [DB::lastId(), '브론즈', 0, date('Y-m-d', time()), date('Y-m-d', time())]);

        if($data && $mile) {
            redirect('회원가입 성공', '/');
        } else {
            back("실패");
        }

    }

    public function loginProcess() {
        extract($_POST);

        $data = DB::fetch("SELECT * FROM users where id=? and password=?",
        [$id, $pw]);

        if($data) {
            $_SESSION['user'] = $data;
            self::mileage();
            redirect("로그인 성공", "/");
        } else {
            back("실패");
        }

    }

    public function mileage() {
        $mileage = DB::fetch("SELECT * FROM mileage where uidx=?", [$_SESSION['user']->idx]);
        $day = intval((strtotime(date('Y-m-d'), time()) - strtotime($mileage->update_date)) / 86400);

        $minus = 0;

        if($day >= 90) {
            $minus = 15;
        } else if($day >= 60) {
            $minus = 10;
        } else if($day >= 30) {
            $minus = 5;
        }

        $score = $mileage->score - $minus;
        if($score < 0) {$score = 0;}
        if($score < 10) {
            $grade = "브론즈";
        } else if($score < 20) {
            $grade = "실버";
        } else if($score < 30) {
            $grade = "골드";
        } else if($score < 50) {
            $grade = "플레티엄";
        } else if($score >= 50) {
            $grade = "다이아";
        }

        DB::execute("UPDATE `mileage` SET `score`=?, `grade`=? where uidx=?",
        [$score, $grade, $_SESSION['user']->idx]);

    }

    public function logout() {
        unset($_SESSION['user']);
        redirect('로그아웃 성공', '/');
    }

    

}