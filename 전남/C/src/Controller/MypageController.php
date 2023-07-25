<?php
namespace src\Controller;
use src\App\DB;

class MypageController {
    public function mypage() {
        if(!isset($_SESSION['user'])) {
            back("로그인 후 이용가능");
        } else if($_SESSION['user']->type == "일반") {
            self::normal();
        }
    }
    
    public function normal() {
        $basketList = DB::fetchAll("select s.*, b.idx as bidx from basket b, specialties s where b.sidx = s.idx and b.uidx=? order by b.idx desc;", [$_SESSION['user']->idx]);
        $purchaseList = DB::fetchAll("select p.idx, s.name, s.point, p.create_date, p.count from purchase p, specialties s where s.idx = p.sidx and p.uidx=? order by p.create_date", [$_SESSION['user']->idx]);

        view('mypage/normal', ["basketList"=>$basketList, "purchaseList"=>$purchaseList]);
    }

    public function basketDeleteProcess($idx) {
        $data = DB::execute("DELETE FROM basket where idx=?", [$idx]);
        if($data) {
            goBack();
        } else {
            back("실패");
        }
    }

    public function purchaseProcess($idx, $bidx, $point, $count) {
        if($_SESSION['user']->point - $point <= 0) {
            back("포인트가 부족합니다.");
        }

        $data = DB::execute("DELETE FROM basket where idx=?", [$bidx]);
        $data2 = DB::execute("INSERT INTO `purchase`(`sidx`, `uidx`, `count`) VALUES (?,?,?)",
        [$idx, $_SESSION['user']->idx, $count]);

        // 포인트 감소
        $data3 = DB::execute("UPDATE users SET `point`=? where idx=?",
        [($_SESSION['user']->point - $point), $_SESSION['user']->idx]);

        $_SESSION['user']->point = $_SESSION['user']->point - $point;

        if($data && $data2 && $data3) {
            back("구매완료");
        } else {
            back("실패");
        }
    }

    public function purchaseDeleteProcess($idx) {
        $data = DB::execute("DELETE FROM purchase where idx=?", [$idx]);
        if($data) {
            goBack();
        } else {
            back("실패");
        }
    }

}