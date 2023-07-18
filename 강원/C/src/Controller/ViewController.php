<?php


namespace src\Controller;

use src\App\DB;

class ViewController extends Controller
{
    public function index()
    {
        $this->render("index");
    }    
    public function sign()
    {
        $this->render("sign");
    }    
    public function login()
    {
        $this->render("login");
    }    
    public function entry()
    {
        $this->render("entry");
    }    
    
    public function join() {
        $this->render("join");
    }
    
}