<?php

namespace src\Controller;

use src\App\DB;

class ShowController extends Controller
{

    // 출품신청
    public function entry()
    {

        extract($_POST);

        DB::fetch("INSERT INTO `entry`(`name`, `id`, `movie`, `time`, `year`, `type`, `isShow`) VALUES (?,?,?,?,?,?,'not')", [$name, $id, $movie, $time, $year, $type]);

        msgAndGo("성공적으로 값이 적용되었습니다.", "/schedule");

    }

    //상영일정 
    public function schedule()
    {
        $year = isset($_GET['year']) ? $_GET['year'] : date('Y');
        $month = isset($_GET['month']) ? $_GET['month'] : date('m');
        $calendar = DB::fetchAll("SELECT * FROM `shows`");

        $date = "$year-$month-01";
        $time = strtotime($date);
        $start_week = date('w', $time);
        $total_day = date('t', $time);
        $total_week = ceil(($total_day + $start_week) / 7);
        $prev_month = $month - 1;
        if ($month == 1) {
            $prev_month = 12;
        }
        $prev_day = date('t', strtotime("$year-{$prev_month}-01")) - $start_week + 1;

        $this->render("schedule", [
            'c' => $calendar,
            'year' => $year,
            'month' => $month,
            'date' => $date,
            'time' => $time,
            'start_week' => $start_week,
            'total_day' => $total_day,
            'total_week' => $total_week,
            'prev_month' => $prev_month,
            'prev_day' => $prev_day
        ]);
    }


    //관리자 
    public function manage()
    {
        $result = DB::fetchAll("SELECT * FROM `entry` WHERE isShow='not'");
        $this->render("manage", ['result' => $result]);
    }

    //상영일정 추가
    public function manageInsert()
    {
        extract($_POST);
        $date = str_replace('T', ' ', $date) . ":00";
        $dates = DB::fetch("SELECT * FROM `shows` WHERE date=? or runtime=?", [$date, $runtime]);
        if ($dates) {
            msg("다른 상영일정이랑 겹칩니다.");
            return;
        }
        DB::fetch("UPDATE `entry` SET `isShow`='show' WHERE idx=?", [$entry]);
        DB::fetch("INSERT INTO `shows`(`date`, `entrys`, `title`, `runtime`) VALUES (?,?,?,?)", [$date, $entry, $title, $runtime]);
        self::schedule();
    }

    // 상영일정 상세페이지
    public function detail()
    {
        extract($_GET);

        $date = "%" . $y . "-" . str_pad($m, 2, "0", STR_PAD_LEFT) . "-" . str_pad($d, 2, "0", STR_PAD_LEFT) . "%";

        $result = DB::fetchAll("SELECT e.*, s.date FROM `entry` e, shows s WHERE e.idx = s.entrys and s.date like ?", [$date]);

        $this->render("detail", ['result' => $result]);
    }

    //상영 검색
    public function search()
    {
        $search = DB::fetchAll("SELECT * FROM `entry`");
        $this->render("search", ['search' => $search, 'cnt' => count($search)]);
    }

    public function searchItem()
    {
        extract($_POST);
        $search = "%" . $search . "%";
        $searchSql = DB::fetchAll(
            "SELECT * FROM `entry` WHERE type=? and (name like ? or id like ? or movie like ? or time like ? or year like ? or type like ?)",
            [
                $type,
                $search,
                $search,
                $search,
                $search,
                $search,
                $search
            ]
        );

        $searchs = DB::fetchAll("SELECT * FROM `entry`");
        $this->render("search", ['search' => $searchSql, 'cnt' => count($searchs)]);
    }

    // 콘테스트 참여하기
    public function join()
    {
        if (!isset($_SESSION['user'])) {
            msg("로그인 후 사용가능합니다.");
            return;
        }
        extract($_POST);

        $name = $_FILES['video']['name'];
        $tmp_name = $_FILES['video']['tmp_name'];
        $position = strpos($name, ".");
        $fileextension = substr($name, $position + 1);
        $fileextension = strtolower($fileextension);

        if (isset($name)) {

            $path = './videos/';
            if (empty($name)) {
                echo "Please choose a file";
            } else if (!empty($name)) {
                if (($fileextension !== "mp4") && ($fileextension !== "ogg") && ($fileextension !== "webm")) {
                    echo "The file extension must be .mp4, .ogg, or .webm in order to be uploaded";
                } else if (($fileextension == "mp4") || ($fileextension == "ogg") || ($fileextension == "webm")) {
                    move_uploaded_file($tmp_name, $path . $name);
                }
            }
        }

        DB::fetch("INSERT INTO `video`(`name`, `video`) VALUES (?,?)", [$_SESSION['user']['id'], $name]);

        $this->render("contest");
    }

    //영화티저 콘테스트 
    public function contest() {
        $this->render("conetst");
    }

}