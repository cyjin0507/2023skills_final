<?php
namespace src\Controller;
use src\App\DB;

class MypageController {
    public function mypage($page) {
        if(!isset($_SESSION['user'])) {
            back("로그인 후 이용가능");
        }

        // 가격은 1일당 가격? 아님 전체 가격?
        $reserv = DB::fetchAll("select r.*, a.name as acco, b.name, b.price, b.idx as ridx from acco a, room b, reservation r where a.idx = b.aidx and r.ridx = b.idx and r.uidx=?", [$_SESSION['user']->idx]);
        
        $list = array_slice($reserv, $page*5-5,$page*5);

        $user = DB::fetch("select u.*, m.grade, m.score from users u, mileage m where m.uidx = u.idx and u.idx=?", [$_SESSION['user']->idx]);

        view('mypage', ['list'=>$list, 'reserv'=>$reserv, 'page'=>$page, 'user'=>$user]);
    }

    public function reservationCancel($idx) {
        $data = DB::execute("DELETE FROM reservation where idx=?", [$idx]);
        if($data) {
            back("예약이 삭제되었습니다.");
        }
    }

    public function reviewAddProcess() {
        extract($_POST);

        $image = $_FILES['file'];
        $imageName = rand() . $image['name'];
        if($image['name'] != "") {
            move_uploaded_file($image['tmp_name'], __UPLOAD . $imageName);
        } else {
            $imageName = "";
        }

        $data = DB::execute("INSERT INTO `review`(`reservIdx`, `roomIdx`, `uidx`, `grade`, `content`, `image`) VALUES (?,?,?,?,?,?)",
        [$reservIdx, $roomIdx, $_SESSION['user']->idx, $grade, $content, $imageName]);

        if($data) {
            self::mileage($reservIdx);
            back("리뷰작성 성공");
        }
    }

    public function mileage($reservIdx) {
        $reserv = DB::fetch("SELECT * FROM reservation where idx=?", [$reservIdx]);
        $start = $reserv->start;
        $end = $reserv->end;

        $day = intval((strtotime(date($end))-strtotime($start)) / 86400);

        $score = DB::fetch("SELECT * FROM mileage where uidx=?", [$_SESSION['user']->idx])->score;
        $score = $score + $day;

        $grade = "";

        if($score < 10) {
            $grade = "브론즈";
        } else if($score < 20) {
            $grade = "실버";
        } else if($score < 30) {
            $grade = "골드";
        } else if($score < 50) {
            $grade = "플레티엄";
        } else if($score >= 50) {
            $grade = "다이아";
        }

        DB::execute("UPDATE mileage SET grade=?, score=?, update_date=?, change_date=? where uidx=?",
        [$grade, $score, date("Y-m-d", time()), date("Y-m-d", time()), $_SESSION['user']->idx]);

    }

    public function review() {
        $list = DB::fetchAll("select u.name as user, b.name, r.content, r.create_date, r.idx from review r, users u, room b where r.uidx = u.idx and b.idx = r.roomIdx",[]);

        view('review', ['list'=>$list]);
    }

    public function reviewDetail($idx) {
        $list = DB::fetch("select r.idx, u.idx as uidx, a.name as acco, b.name as room, u.name as user, r.create_date, r.content from review r, users u, acco a, room b where r.roomIdx = b.idx and r.uidx = u.idx and a.idx = b.aidx and r.idx=?", [$idx]);
        $comment = DB::fetchAll("SELECT c.*, u.name FROM comment c, users u where c.ridx=? and u.idx=c.uidx", [$idx]);

        view('reviewDetail', ['list'=>$list, 'idx'=>$idx, 'comment'=>$comment]);
    }

    public function commentAdd() {
        extract($_POST);

        $data = DB::execute("INSERT INTO `comment`(`uidx`, `ridx`, `comment`) VALUES (?,?,?)",
        [$_SESSION['user']->idx, $idx, $comment]);

        if($data) {
            goBack();
        }

    }

    public function userInfoModify() {
        extract($_POST);

        if($pw != $_SESSION['user']->password) {
            back("비밀번호가 틀렸습니다.");
        }

        $data = DB::execute("UPDATE `users` SET `tel`=? where idx=?", [$tel, $_SESSION['user']->idx]);
        if($data) {
            back("전화번호 변경 성공");
        }

    }

}