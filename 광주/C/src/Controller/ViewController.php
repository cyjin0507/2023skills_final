<?php


namespace src\Controller;

use src\App\DB;

class ViewController extends Controller
{
    public function index()
    {
        $this->render("index");
    }
    public function login()
    {
        $this->render("login");
    }

    // json -> db로 바꾸기
    public function setDB()
    {
        $json = file_get_contents('./resources/json/data.json');
        $data = json_decode($json, true)[0]['data'];                
        foreach($data as $item) {                        
            DB::fetch('INSERT INTO `data`(`product`, `price`, `img`, `longinfo`, `shortinfo`, `quantity`, `category`, `hit`) VALUES (?,?,?,?,?,?,?,?)', [$item["product"],$item["price"], $item["img"], $item["longinfo"],$item["shortinfo"],$item["quantity"],$item["category"],$item["hit"]]);
        }
        $json = file_get_contents('./resources/json/member.json');
        $data = json_decode($json, true)[0]['data'];                
        foreach($data as $item) {                        
            DB::fetch('INSERT INTO `member`( `name`, `id`, `pw`, `age`, `area`, `level`) VALUES (?,?,?,?,?,?)', [$item["name"],$item["id"], $item["pw"], $item["age"],$item["area"],$item["level"]]);
        }
        $json = file_get_contents('./resources/json/reserve.json');
        $data = json_decode($json, true)[0]['data'];                
        foreach($data as $item) {            
            DB::fetch('INSERT INTO `reserve`(`name`, `product`, `state`, `rdate`, `quantity`, `address`, `price`, `saleprice`, `okdate`) VALUES (?,?,?,?,?,?,?,?,?)', [$item["name"],$item["product"], $item["state"], $item["rdate"],$item["quantity"],$item["address"],$item["price"],$item["saleprice"],$item["okdate"]]);
            // 숫자로 된건 다 int type으로 바꿀것
        }
    }
}