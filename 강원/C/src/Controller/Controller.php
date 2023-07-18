<?php


namespace src\Controller;

class Controller {
    public function render($name, $data = []) {
        extract($data);

        require_once(__VIEWS . __DS . 'layout' . __DS . "header.php");
        require_once(__VIEWS . __DS . "$name.php");
        require_once(__VIEWS . __DS . 'layout' . __DS . "footer.php");
    }
}