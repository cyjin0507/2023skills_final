<?php
namespace src\Controller;
use src\App\DB;

class AdminController {
    public function admin() {
        if(!isset($_SESSION['user'])) {
            redirect("로그인 후 이용해주세요.", "/login");
        } else if($_SESSION['user']->id != "admin") {
            redirect("관리자 전용 페이지입니다.", "/");
        }

        view('admin');
    }

    public function goodsRegisterProcess() {
        extract($_POST);

        $images = $_FILES['file'];
        if($images['name'] == "") {
            back("이미지를 선택해주세요.");
        }

        $imageName = rand() . $images['name'];
        move_uploaded_file($images['tmp_name'], __UPLOAD . $imageName);

        $data = DB::execute("INSERT INTO `goods`(`name`, `unit`, `price`, `stock`, `img`) VALUES (?,?,?,?,?)",
        [$name, $unit, $price, $stock, $imageName]);

        if($data) {
            back("특산품 등록 완료");
        } else {
            back("실패");
        }

    }

    public function adminGoodsGet() {
        $data = DB::fetchAll("SELECT * FROM goods");

        echo json_encode($data);
    }

    public function goodsDeleteProcess($idx) {
        $data = DB::execute("DELETE FROM goods where idx=?", [$idx]);
        if($data) {
            goBack();
        } else {
            back("실패");
        }
    }

}