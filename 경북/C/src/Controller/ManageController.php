<?php

namespace src\Controller;

use src\App\DB;

class ManageController  extends Controller{
    public function manageGame() {
       
        $this->render("manageGame");
    }
    public function manageReview() {
       
        $this->render("manageReview");
    }


    public function game()
    {
        header("Content-Type: application/json");

        $output = DB::fetchAll("SELECT * FROM game order by date desc");

        echo json_encode($output);
    }

    public function delete() {
        extract($_GET);
        if(isset($type) && $type == "game") {
            DB::fetch('DELETE FROM `game` WHERE idx=?', [$idx]);
        } else if(isset($type) && $type == "review") {            
            DB::fetch('DELETE FROM `review` WHERE idx=?', [$idx]);
        }
        msg("성공적으로 삭제 되었습니다.");        
    }
    public function update() {
        extract($_POST);
        DB::fetch('UPDATE `review` SET `idx`=?,`title`=?,`visit`=?,`rate`=?,`text`=?,`place`=? WHERE idx=?', [$idx, $title, $visit, $rate, $text, $place, $idxValue]);   

        msgAndGo("성공적으로 수정 되었습니다.", "/manageReview");        
    }

    public function review()
    {
        header("Content-Type: application/json");
        $output = DB::fetchAll("SELECT * FROM review");
        echo json_encode($output);
    }
   
}