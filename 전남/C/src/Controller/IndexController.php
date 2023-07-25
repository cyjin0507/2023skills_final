<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        // phpinfo();
        view('index');
    }

    public function login() {
        view('login');
    }

    public function join() {
        view('join');
    }

    public function logout() {
        unset($_SESSION['user']);
        redirect("로그아웃 성공", "/");
    }

    public function loginProcess() {
        extract($_POST);

        $data = DB::fetch("SELECT * FROM users where id=? and password=?", [$id, $pw]);
        if($data) {
            $_SESSION['user'] = $data;
            redirect("로그인 성공", "/");
        } else {
            back("로그인 실패");
        }
    }

}