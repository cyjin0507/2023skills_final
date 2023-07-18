<?php

namespace src\Controller;

use src\App\DB;

class ShopController extends Controller
{

    // shop.php
    public function shop()
    {

        $reserve = [];
        if (!isset($_SESSION['user'])) {
            $reserve = DB::fetchAll("SELECT *, SUM(quantity) as count FROM `reserve` WHERE state='구매확정' GROUP BY product ORDER BY count desc LIMIT 4");
        } else {
            $reserve['ten'] = DB::fetchAll("SELECT r.*, SUM(quantity) as count FROM `reserve` r, `member` m WHERE m.age >= 10 and m.age <= 19 and r.name = m.name and state='구매확정' GROUP BY product ORDER BY count desc LIMIT 4");
            $reserve['twenty'] = DB::fetchAll("SELECT r.*, SUM(quantity) as count FROM `reserve` r, `member` m WHERE m.age >= 20 and m.age <= 29 and r.name = m.name and state='구매확정' GROUP BY product ORDER BY count desc LIMIT 4");
            $reserve['thirty'] = DB::fetchAll("SELECT r.*, SUM(quantity) as count FROM `reserve` r, `member` m WHERE m.age >= 30 and m.age <= 39 and r.name = m.name and state='구매확정' GROUP BY product ORDER BY count desc LIMIT 4");
            $reserve['fourty'] = DB::fetchAll("SELECT r.*, SUM(quantity) as count FROM `reserve` r, `member` m WHERE m.age >= 40 and m.age <= 49 and r.name = m.name and state='구매확정' GROUP BY product ORDER BY count desc LIMIT 4");
        }

        $datas = DB::fetchAll("SELECT d1.* FROM `data` d1 INNER JOIN (SELECT category, MAX(quantity) as max_quantity FROM `data` GROUP BY category) d2 ON d1.category=d2.category AND d1.quantity= d2.max_quantity GROUP BY d1.category ORDER BY d1.quantity DESC LIMIT 4");


        $this->render("shop", ['reserve' => $reserve, 'datas' => $datas]);
    }

    //카테고리
    public function category() {
        extract($_GET);

        if(!isset($cate)) {
            msg("잘못된 경로입니다.");
            return;
        }

        $result = ""; $typeValue = "";
        if(isset($type)) {
            if($type == "1") {
                $typeValue = " ORDER BY hit DESC";
            } else if($type == "2") {                
                $typeValue = " ORDER BY quantity DESC";
            } else if($type == "3") {
                $typeValue = " ORDER BY price DESC";
            }
        }    
        // 데이터가 펜시이다가 중간에 팬시 데이터가 껴있음 의도한건지 오타인지 모르겠음
        if($cate =='팬시' || $cate == "펜시") {            
            $result = DB::fetchAll("SELECT * FROM `data` WHERE category='펜시' or category='팬시'" . $typeValue);
        } else {            
            $result = DB::fetchAll("SELECT * FROM `data` WHERE category=?" . $typeValue, [$cate]);
        }               
        $category = DB::fetchAll("SELECT * FROM `data` GROUP BY category");
        if($result) {
            $this->render("category",['datas'=> $result, 'cate'=> $cate,'category'=> $category]);
        } else {
            msg("잘못된 경로입니다.");
        }

    }

    // 상세 페이지
    public function detail()
    {
        extract($_GET);

        if(!isset($idx)) {
            msg("잘못된 경로입 니다.");
        }        
        $result = DB::fetch("SELECT * FROM `data` WHERE idx=?",[$idx]);
        DB::fetch("UPDATE `data` SET `hit`=? WHERE idx=?",[((int)$result->hit) + 1, $idx]);


         // 최근 본 상품에 상품 추가
        self::addRecent($idx, $result->product);        

        $reviews = DB::fetchAll("SELECT * FROM `review` WHERE productid=? ORDER BY date desc",[$idx]);
        $login = ""; 
        if(isset($_SESSION['user'])) {
            $login= DB::fetch("SELECT * FROM `member` WHERE id=?",[$_SESSION['user']['id']]);
        }       
        $isReserve = DB::fetch("SELECT * FROM `reserve` WHERE name =? and product=?", [$login->name,$result->product]);
        $isReview = DB::fetch("SELECT * FROM `review` WHERE name =? and productid=?", [$login->name,$idx]);
        // $rate = DB::fetch("SELECT r.* FROM `review` re, `reserve` r WHERE r.name =? and r.name=re.name and re.productid=? and r.product=?", [$login->name, $idx,$result->product]) ;

        $this->render("detail", ['result'=> $result, 'login' => $login, "reviews"=> $reviews, 'isReserve' => $isReserve,  'isReview' => $isReview]);

    }

    // 리뷰 작성
    public function review() {
        extract($_POST);
        if(isset($rate)&& $rate != "") {
           DB::fetch("INSERT INTO `review`(`title`, `content`, `rate`, `name`, `date`, `productid`) VALUES (?,?,?,?,NOW(),?)", [$title, $text, $rate, $name, $productid]);
        } else {            
           DB::fetch("INSERT INTO `review`(`title`, `content`, `name`, `date`, `productid`) VALUES (?,?,?,NOW(),?)", [$title, $text, $name, $productid]);
        }
        msgAndGo("성공적으로 리뷰를 입력하였습니다.", "/detail?idx=$productid");


    }

      // 구매 페이지
      public function pay() {

        extract($_GET);

        if(!isset($idx)) {
            msg("잘못된 경로입 니다.");
        }        
        $result = DB::fetch("SELECT * FROM `data` WHERE idx=?",[$idx]);
        $login= DB::fetch("SELECT * FROM `member` WHERE id=?",[$_SESSION['user']['id']]);

        $this->render('pay',['result'=> $result, 'login' => $login, 'cnt' => $cnt]);
    }

    //결제하기
    public function payInsert() {

        extract($_POST);

        $data = DB::fetch("SELECT * FROM `data` WHERE idx=?", [$productid]);
        $member = DB::fetch("SELECT * FROM `member` WHERE id=?", [$_SESSION['user']['id']]);

        if((int) $quantity >= (int) $cnt) {        
            $result= DB::fetch("INSERT INTO `reserve`(`name`, `product`, `state`, `rdate`, `quantity`, `address`, `price`, `saleprice`) VALUES (?,?,'불확정',NOW(),?,?,?,?)",
            [$member->name, $data->product, $cnt, $address,(int)$data->price * $cnt, $sale]);
            DB::fetch("UPDATE `data` SET `quantity`=? WHERE idx=?", [(int) $data->quantity - 1, $productid]);
            msgAndGo("결제가 완료 되었습니다.", "/");            
        } else {
            
            msg("재고 수량이 부족합니다.");
        }
    }



    //최근 본상품
    public function addRecent($idx, $product)
    {
        if (!isset($_SESSION['recent'])) {
            $_SESSION['recent'] = array();
        }

        $recent = $_SESSION['recent'];

        // 이미 최근 본 상품에 있는지 확인하고 있다면 삭제
        if (($key = array_search($idx, array_column($recent, 'idx'))) !== false) {
            unset($recent[$key]);
        }

        // 배열 맨 앞에 상품 추가
        array_unshift($recent, [
            'idx' => $idx, 
            'product' => $product,             
            'user' => $_SESSION['user']['id'],             
        ]);

        // 최근 본 상품 목록을 3개로 제한
        if (count($recent) > 3) {
            array_pop($recent);
        }

        $_SESSION['recent'] = $recent;
    }

  

  



}