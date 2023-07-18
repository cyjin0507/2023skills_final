<?php

namespace src\Controller;

use src\App\DB;

class PlaceController extends Controller
{
    // 테이블 정보들 가져오기
    public function place()
    {
        header("Content-Type: application/json");

        $output = [];
        $output['place'] = DB::fetchAll("SELECT * FROM place");
        $output['review'] = DB::fetchAll("SELECT * FROM review");

        echo json_encode($output);        
    }

    // 리뷰 작성하기
    public function reviewInsert()
    {
        extract($_POST);
        DB::fetch('INSERT INTO `review`( `title`, `visit`, `rate`, `text`, `place`) VALUES (?,?,?,?,?)', [$name, $date, (float) $star / 10, $text, $idx]);

        msgAndGo("리뷰가 작성되었습니다.", "/detail?idx=$idx");
    }

    // 상세보기 페이지 테이블 정보들 가져오기
    public function detail()    
    {
        extract($_GET);
        $reviews = DB::fetchAll("SELECT * FROM review where place=? order by visit desc", [$idx]);
        $place = DB::fetch("SELECT * FROM place where idx=?", [$idx]);
        $this->render("detail", ['reviews' => $reviews, 'place' => $place]);        
    }

}