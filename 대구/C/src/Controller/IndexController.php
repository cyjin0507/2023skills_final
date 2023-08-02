<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        view('index');
    }

    public function login() {
        if(isset($_SESSION['user'])) {
            redirect("로그인 된 유저는 사용불가 페이지입니다.", '');
        }
        view('login');
    }

    public function join() {
        if(isset($_SESSION['user'])) {
            redirect("로그인 된 유저는 사용불가 페이지입니다.", '');
        }
        view('join');
    }

    public function logout() {
        unset($_SESSION['user']);
        redirect("로그아웃 성공", '/');
    }

    public function loginProcess() {
        extract($_POST);

        $data = DB::fetch("SELECT * FROM users where id=? and password=?", [$id, $pw]);
        if($data) {
            $_SESSION['user'] = $data;
            redirect('로그인 성공', '/');
        } else {
            back("로그인 실패");
        }
    }

    public function joinProcess() {
        extract($_POST);

        $data = DB::execute("INSERT INTO `users`(`id`, `password`, `name`, `birth`, `phone`, `type`) VALUES (?,?,?,?,?,?)",
        [$id, $pw, $name, $birth, $phone, $type]);

        if($data) {
            redirect('회원가입 성공', '/');
        }

    }

    public function mypage() {
        $reservList = DB::fetchAll("SELECT b.type as bus, b.number, b.image, r.start as startLoc, r.reserv_time, b.start, b.middle, b.end, r.seat, r.accept FROM `reservation` r, bus b, users u where r.bidx = b.idx and u.idx = r.uidx and u.idx=?;", [$_SESSION['user']->idx]);
        view('mypage/user/mypage', ['list'=>$reservList]);
    }


}