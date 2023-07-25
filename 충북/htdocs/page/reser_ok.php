<?php

if($_POST){
    if($res_dat < $res_date){
        alert("관람날짜가 경과되었습니다");
        back();
    }

    if(!$res_date){
        alert("날짜를 선택해주세요");
        back();
    }

    sql("insert into reser (r_idx, id, date, sta) values ('$res_idx', '$ids', '$res_date', 'chk_w')");
    alert("예약이 완료되었습니다");
    move("/reser");
}