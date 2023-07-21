<?php
namespace src\Controller;
use src\App\DB;

class IndexController {
    public function index() {
        // phpinfo();
        view('index');
    }

    public function logout() {
        unset($_SESSION['user']);
        goBack();
    }

    public function recommand() {
        view('recommand');
    }

    public function gallery() {
        view('gallery');
    }


}