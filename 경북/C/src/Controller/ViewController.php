<?php


namespace src\Controller;

use src\App\DB;

class ViewController extends Controller
{
    public function index()
    {
        $this->render("index");
    }
    public function review()
    {
        $this->render("review");
    }
    public function place()
    {
        $this->render("place");
    }
    public function game()
    {
        $this->render("game");
    }
    public function login()
    {
        $this->render("login");
    }
    public function snake()
    {
        $this->render("snake");
    }
    public function walnut()
    {
        $this->render("walnut");
    }

    // json -> db로 바꾸기
    public function setDB()
    {
        $json = file_get_contents('./resources/json/place.json');
        $data = json_decode($json, true)['data'];                
    
        foreach($data as $item) {
            DB::fetch('INSERT INTO `place` VALUES (?,?,?,?)', [$item["idx"],$item["title"], $item["distance"],"/place/{$item["idx"]}.jpg"]);
        }
    }
}