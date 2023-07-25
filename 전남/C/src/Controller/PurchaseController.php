<?php
namespace src\Controller;
use src\App\DB;

class PurchaseController {
    public function purchase() {
        if(!isset($_SESSION['user'])) {
            back("로그인 한 회원만 접근 가능합니다.");
        }

        $list = DB::fetchAll("SELECT * FROM specialties");

        view('purchase', ['list'=>$list]);
    }

    public function basketProcess($idx) {
        $data = DB::execute("INSERT INTO `basket`(`sidx`, `uidx`) VALUES (?,?)", [$idx, $_SESSION['user']->idx]);
        if($data) {
            back("장바구니에 담겼습니다.");
        } else {
            back("실패");
        }
    }

}