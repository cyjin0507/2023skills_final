<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        // phpinfo();
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

        if($data) {
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
            redirect("로그인 성공", "/");
        } else {
            back("실패");
        }

    }

    public function logout() {
        unset($_SESSION['user']);
        redirect('로그아웃 성공', '/');
    }

    

}