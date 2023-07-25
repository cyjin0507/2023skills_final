<?php

if($_POST){
    $pw = hash("sha256", $lo_pw);
    $sql = "select * from user where id = '$lo_id' and pw = '$lo_pw'";

    if(row($sql) < 1){
        alert("아이디 또는 비밀번호를 확인해주세요");
        back();
    } else {
        $_SESSION['ids'] = fetch($sql)->id;
        $_SESSION['names'] = fetch($sql)->name;

        alert("로그인이 완료되었습니다");
        if($lo_id == "admin" && $lo_pw == "1234"){
            move("/admin");
        } else {
            move("/");
        }
    }
}