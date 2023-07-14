<?php
namespace src\Controller;
use src\App\DB;

class ClientController {
    public function acco($category, $search) {
        if(!isset($_SESSION['user'])) {
            back("로그인 한 회원만 이용할 수 있습니다.");
        }

        $list = [];
        if($category != "all") {
            $list = DB::fetchAll("SELECT * FROM acco where type=?", [$category]);
        }

        $loc = [];
        if($search != "all") {
            $loc = DB::fetch("SELECT * FROM acco where name=?", [urldecode($search)]);
        }

        view('client', ['category'=>$category, 'search'=>$search, 'list'=>$list, 'loc'=>$loc]);
    }

    public function room($idx) {
        $list = DB::fetchAll("SELECT * FROM room where aidx=?", [$idx]);
        view('accoDetail', ['list'=>$list]);
    }

    public function reservation() {
        extract($_POST);

        if($start >= $end) {
            back("예약날짜가 이상함");
        }

        $reserv = DB::fetchAll("SELECT * FROM reservation where ridx=?", [$idx]);
        foreach($reserv as $key=>$value) {
            // 다시
            if($reserv[$key]->start <= $start && $reserv[$key]->end >= $end) {
                back("이미 예약됨");
            }
        }

        $data = DB::execute("INSERT INTO `reservation`(`uidx`, `ridx`, `start`, `end`) VALUES(?,?,?,?)",
        [$_SESSION['user']->idx, $idx, $start, $end]);


        if($data) {
            back("예약완료");
        }

    }

    public function commentDelete($idx) {
        $data = DB::execute("DELETE FROM comment where idx=?", [$idx]);
        if($data) {
            back("댓글 삭제 완료");
        }
    }

    public function reviewDelete($idx) {
        $data = DB::execute("DELETE FROM review where idx=?", [$idx]);
        if($data) {
            redirect("리뷰 삭제 완료", '/review');
        }
    }

}