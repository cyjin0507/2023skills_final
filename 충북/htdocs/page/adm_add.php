<?php

if($_POST){
    if(!$adm_tit || !$adm_date || !$adm_loc || !$adm_con || $_FILES['adm_img']['size'] < 0){
        alert("제목과 내용, 날짜, 장소, 사진은 필수 입니다");
        back();
    }

    $tmpname = $_FILES['adm_img']['tmp_name'];
    $name = $_FILES['adm_img']['name'];

    move_uploaded_file($tmpname, "image/".$name);

    sql("insert into watch (tit, con, date, loc, img) values ('$adm_tit', '$adm_con', '$adm_date', '$adm_loc', '$name')");
    alert("추가가 완료되었습니다");
    move("/admin");
}