<?php
namespace src\Controller;
use src\App\DB;

class MypageAdminController {
    public function mypage() {
        $list = DB::fetchAll("SELECT * FROM bus where accept=1");
        view('mypage/admin/admin', ['list'=>$list]);
    }

    public function busAcceptProcess($idx, $date, $time) {
        $data = DB::execute("UPDATE bus SET accept=2, date=?, time=? where idx=?", [$date,$time,$idx]);
        if($data) {
            back("승인이 완료되었습니다.");
        }
    }

}