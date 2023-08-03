<?php
namespace src\Controller;
use src\App\DB;

class ParsingController {
    public function member() {
        $json_string = file_get_contents(__JSON . 'member.json');
        $R = json_decode($json_string, true);
        $parsing = $R[0]['data'];
        foreach($parsing as $key => $value) {
            DB::execute("INSERT INTO `member`(`name`, `id`, `pw`, `age`, `area`, `level`) VALUES (?,?,?,?,?,?)",
            [$parsing[$key]['name'],$parsing[$key]['id'],$parsing[$key]['pw'],
            $parsing[$key]['age'],$parsing[$key]['area'],$parsing[$key]['level']]);
        }
    }

    public function data() {
        $json_string = file_get_contents(__JSON . 'data.json');
        $R = json_decode($json_string, true);
        $parsing = $R[0]['data'];
        foreach($parsing as $key=>$value) {
            DB::execute("INSERT INTO `data`(`product`, `price`, `img`, `longinfo`, `shortinfo`, `quantity`, `category`, `hit`) VALUES (?,?,?,?,?,?,?,?)",
            [$parsing[$key]['product'],$parsing[$key]['price'],$parsing[$key]['img'],
            $parsing[$key]['longinfo'],$parsing[$key]['shortinfo'],$parsing[$key]['quantity'],
            $parsing[$key]['category'],$parsing[$key]['hit']]);
        }
    }

    public function reserve() {
        $json_string = file_get_contents(__JSON . 'reserve.json');
        $R = json_decode($json_string, true);
        foreach($R as $key=>$value) {
            echo $R[$key]['name'];
            DB::execute("INSERT INTO `reserve`(`name`, `product`, `state`, `rdate`, `quantity`, `address`, `price`, `salePrice`, `okdate`) VALUES (?,?,?,?,?,?,?,?,?)",
            [$R[$key]['name'],$R[$key]['product'],$R[$key]['state'],$R[$key]['rdate'],$R[$key]['quantity'],$R[$key]['address'],$R[$key]['price'],$R[$key]['salePrice'],$R[$key]['okdate']]);
        }

    }

}