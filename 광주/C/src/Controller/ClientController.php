<?php
namespace src\Controller;
use src\App\DB;

class ClientController {
    public function shop() {
        $data = "";
        if(isset($_SESSION['user'])) {
            $age = floor(($_SESSION['user']->age) / 10) * 10;
            $data = DB::fetchAll("select sum(r.quantity) as count, d.* from reserve r, data d, member m where r.product = d.product and m.name = r.name and m.age >= ".$age." and m.age < ".($age+10)." GROUP BY r.product ORDER BY count desc LIMIT 0,4;");
        } else {
            $data = DB::fetchAll('select sum(r.quantity) as count, d.* from reserve r, data d where r.product = d.product GROUP BY r.product ORDER BY count desc LIMIT 0,4;');
        }

        $category = DB::fetchAll("select sum(r.quantity) as count, d.* from reserve r, data d where r.product = d.product GROUP BY r.product ORDER BY count desc");

        view('shop', ['data'=>$data, 'category'=>$category]);
    }

    public function category($category, $sort) {
        $list = ['의류', '펜시', '생활용품', '식품'];
        if($category > count($list)) {
            back("잘못된 접근입니다.");
        }

        $data = "";
        if($sort==0) {
            $data = DB::fetchAll("select * from data where category = ?", [$list[$category]]);
        } else if($sort==1) {
            $data = DB::fetchAll("select * from data where category = ? order by hit desc;", [$list[$category]]);
        } else if($sort==2) {
            $data = DB::fetchAll("select sum(r.quantity) as count, d.* from reserve r, data d where r.product = d.product and d.category = ? GROUP BY r.product ORDER BY count desc;", [$list[$category]]);
        } else if($sort==3) {
            $data = DB::fetchAll("select * from data where category = ? order by price desc;", [$list[$category]]);
        }

        view('category', ['category'=>$category, 'sort'=>$sort, 'data'=>$data]);

    }

    public function product($idx) {
        $data = DB::fetch("SELECT * FROM data where idx=?", [$idx]);
        // $increase = DB::execute("UPDATE data set hit=? where idx=?", [($count->hit)+1, $idx]);
        // if(isset($_SESSION['user'])) {
        //     array_push($_SESSION['product'], $count);
        // }

        view('detail', ['data'=>$data]);
    }

    public function payment() {
        if(!isset($_SESSION['user'])) {
            redirect('로그인 후 이용해주세요.', '/login');
        }
        extract($_GET);
        $data = DB::fetch("SELECT * FROM data where idx=?", [$idx]);

        view('payment', ['data'=>$data, 'count'=>$count, 'total'=>$total]);

    }

    public function paymentProcess() {
        extract($_POST);
        $item = DB::fetch("SELECT * from data where idx=?", [$idx]);
        if($item->quantity < $quantity) {
            back("재고 수량이 부족합니다.");
        }

        $data = DB::execute("INSERT INTO `reserve`(`name`, `product`, `state`, `quantity`, `address`, `price`, `salePrice`, `okdate`) VALUES (?,?,?,?,?,?,?,?)",
        [$_SESSION['user']->name, $product, '불확정', $quantity, $address, $price, ($item->price * $quantity), '']);

        $data2 = DB::execute("UPDATE data SET quantity=? WHERE idx=?", [(intval($item->quantity) - intval($quantity)), $idx]);

        if($data && $data2) {
            redirect('결제가 완료되었습니다.', '/');
        }

    }

}