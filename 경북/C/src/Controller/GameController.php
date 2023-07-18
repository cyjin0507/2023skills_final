<?php

namespace src\Controller;

use src\App\DB;

class GameController extends Controller
{

    // 게임 테이블 가져오기
    public function game()
    {
        header("Content-Type: application/json");

        $output = DB::fetchAll("SELECT * FROM game order by count desc, name asc");

        echo json_encode($output);
    }

    // 게임 테이블에 추가하기
    public function gameInsert()
    {

        $jsondata = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

        // 올바른 값인지 검사
        if (
            !isset($jsondata['name']) ||
            !isset($jsondata['score']) ||
            !isset($jsondata['time']) ||
            !isset($jsondata['gameValue'])
        ) {
            echo '잘못된 요청입니다.';
            exit;
        }

        $name = $jsondata['name'];
        $score = $jsondata['score'];
        $time = $jsondata['time'];
        $gameValue = $jsondata['gameValue'];

        // 추가
        $insertResult = DB::fetch("INSERT INTO `game`(`name`, `count`, `time`, `date`, `game`) VALUES (?,?,?,NOW(),?)", [$name, $score, $time, $gameValue]);

        if($insertResult) {
            msg('성공적으로 값이 저장되었습니다.');
        }
        else {            
            msg('값 저장에 실패하였습니다.');
        }
    }

}