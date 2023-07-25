<?php
namespace src\Controller;
use src\App\DB;

class MypageController {
    public function mypage() {
        $data = DB::fetchAll("SELECT * FROM reservation where uidx=?", [$_SESSION['user']->idx]);
        view('mypage', ['data'=>$data]);
    }

    public function reservDelete($idx) {
        $data = DB::execute("DELETE FROM reservation where idx=?", [$idx]);
        if($data) {
            goBack();
        } else {
            back("실패");
        }
    }

}