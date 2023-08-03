<?php
namespace src\Controller;
use src\App\DB;

class AdminController {
    public function orderPage() {
        $orderList = DB::fetchAll("SELECT r.*, d.price as dprice FROM reserve r, data d where r.product = d.product order by rdate desc");
        view('admin/order', ['orderList'=>$orderList]);
    }

    public function graphPage() {
        view('admin/graph');
    }

    public function productDecide($idx) {
        $data = DB::execute("UPDATE reserve SET state='구매확정' WHERE idx=?", [$idx]);
        if($data) {
            back("구매확정 되었습니다.");
        }
    }

}