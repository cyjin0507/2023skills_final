<?php

namespace src\Controller;

use src\App\DB;

class UserController  extends Controller{

    // 로그인
    public function login() {

        extract($_POST);        

        if($id == 'admin' && $pw == '1234') {
            $_SESSION['user'] = [
                'id' => $id,
                'pw' => $pw,
            ];
            $this->render("index");
        } else if($id == "admin") {
            msg("비밀번호가 틀렸습니다.");
        }else {
            msgAndGo("관리자만 로그인 할 수 있습니다.", "/");
        }
    }

    // 로그아웃
    public function logout() {
        unset($_SESSION['user']);
        $this->render("index");
    }
   
}