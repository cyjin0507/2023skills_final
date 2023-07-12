<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        view('index');
    }

    public function login() {
        view('/login');
    }

    public function join() {
        view('/join');
    }

    public function joinProcess() {
        extract($_POST);

        if($pw != $pw_check) {
            back("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

        $data = DB::execute("INSERT INTO `users`(`email`, `password`, `name`, `tel`) VALUES (?,?,?,?)",
        [$email, $pw, $name, $tel]);

        if($data) {
            redirect("회원가입 성공", '/login');
        } else {
            back("회원가입 실패");
        }
    }

    public function loginProcess() {
        extract($_POST);

        $data = DB::fetch("SELECT * FROM users where email=? and password=?", [$email, $pw]);

        if($data) {
            $_SESSION['user'] = $data;
            redirect('로그인 되었습니다.', '/');
        } else {
            back("로그인 실패");
        }
    }
    
    public function logout() {
        unset($_SESSION['user']);
        redirect('로그아웃 되었습니다.', '/');
    }

    public function test() {
        echo "sdf";
        // view('index');
    }


}