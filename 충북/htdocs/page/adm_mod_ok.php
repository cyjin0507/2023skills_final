<?php

if($_POST){
    if(!$adm_tit || !$adm_con || !$adm_date || !$adm_loc){
        alert("제목과 내용, 날짜, 장소는 필수 입니다");
        back();
    }

    $tmpname = $_FILES['adm_file']['tmp_name'];
    $name = $_FILES['adm_file']['name'];

    move_uploaded_file($tmpname, "image/".$name);

    sql("update watch set tit='$adm_tit', con='$adm_con', date='$adm_date', loc='$adm_loc', file='$name' where idx='$no'");
    alert("수정이 완료되었습니다");
    move("/admin");
}