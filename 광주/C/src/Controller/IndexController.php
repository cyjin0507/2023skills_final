<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        view('index');
    }

    public function loginProcess() {
        extract($_POST);
        $data = DB::fetch("SELECT * FROM member WHERE id=? and pw=?", [$id, $pw]);
        if($data) {
            $_SESSION['user'] = $data;
            $_SESSION['product'] = [];
            back("로그인 되었습니다.");
        } else {
            back("로그인 실패");
        }
    }

    public function logout() {
        unset($_SESSION['user']);
        redirect("로그아웃 되었습니다.", '/');
    }



}