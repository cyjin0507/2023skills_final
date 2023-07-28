<?php
namespace src\Controller;
use src\App\DB;

class ClientController {
    public function placeData() {
        $json_string = file_get_contents(__ROOT . '/resources/json/place.json');
        $R = json_decode($json_string, true);
        foreach($R['data'] as $key=>$value) {
            $data = $R['data'][$key];
            DB::execute("INSERT INTO `place`(`title`, `distance`) VALUES (?,?)", 
            [$data['title'], $data['distance']]);
        }
    }

    public function place() {
        view('place');
    }

    public function placeGetData() {
        $data = DB::fetchAll("SELECT * FROM place");
        echo json_encode($data);
    }

    public function reviewGetData() {
        $data = DB::fetchAll("SELECT * FROM review");
        echo json_encode($data);
    }

    public function reviewAdd() {
        $jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

        $idx = $jsonData['idx'];
        $name = $jsonData['name'];
        $date = $jsonData['date'];
        $score = $jsonData['score'];
        $content = $jsonData['content'];

        $data = DB::execute("INSERT INTO `review`(`pidx`, `title`, `date`, `score`, `content`) VALUES (?,?,?,?,?)",
        [$idx, $name, $date, $score, $content]);

        if($data) {
            echo "success";
        } else {
            echo "false";
        }

    }

    public function reviewScoreCount($idx) {
        $data = DB::fetch("SELECT avg(pidx) as avg FROM `review` where pidx = ?;", [$idx]);
        echo json_encode($data);
    }

    public function reviewCount($idx) {
        $data = DB::fetch("SELECT count(pidx) as cnt FROM `review` where pidx = ?;", [$idx]);
        echo json_encode($data);
    }

}