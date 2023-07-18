<?php

namespace src\Controller;

use src\App\DB;

class UserController  extends Controller{

    // 로그인
    public function login() {

        extract($_POST);        

        if(!isset($id)&& !isset($pw)) {            
            msg('값을 다시 확인해주세요');
            return;
        }

        if($id == "admin" && $pw == "1234") {
            $_SESSION['user'] = [
                'id' => $id,
                'pw' => $pw,
            ];

            msgAndGo("로그인 되었습니다.", "/");
        }

        $result = DB::fetch("SELECT * FROM `member` WHERE id=? and pw=?", [$id, $pw]);


        if($result) {
            $_SESSION['user'] = [
                'id' => $id,
                'pw' => $pw,
            ];
            msgAndGo("로그인 되었습니다.", "/");
        } else {            
            msg('값을 다시 확인해주세요');
        }
    }

    // 로그아웃
    public function logout() {
        unset($_SESSION['user']);            
        $this->render("index");
    }
   
}