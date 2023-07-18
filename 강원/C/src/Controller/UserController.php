<?php

namespace src\Controller;

use src\App\DB;

class UserController extends Controller
{

    // 로그인
    public function login()
    {

        extract($_POST);

        $result = DB::fetch("SELECT pw FROM users WHERE id=?", [$id]);

        if($result->pw == $pw) {
            $_SESSION['user'] = [
                'id' => $id,
                'pw' => $pw,
            ];
            $this->render("index");
        } else if (!$result) {
            msg("id값이 없거나 잘못되었습니다.");
        } else {
            msg("비밀번호가 잘못되었습니다.");
        }
        
    }

    //회원가입
    public function sign()
    {
        extract($_POST);

        DB::fetch("INSERT INTO `users`(`id`, `pw`, `name`) VALUES (?,?,?)", [$id, $pw, $name]);
        msgAndGo("회원가입 되었습니다.", "/login");
    }

    // 로그아웃
    public function logout()
    {
        unset($_SESSION['user']);
        $this->render("index");
    }

}