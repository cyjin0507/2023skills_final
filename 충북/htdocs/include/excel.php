<?php

require_once($_SERVER['DOCUMENT_ROOT']."/include/lib.php");

if($_POST){
    if($st_date > $en_date && $en_date){
        alert("날짜를 다시 설정해 주세요");
        back();
    }

    header("Content-type: application/vnd.ms-excel; charset=utf-8");
    header("Content-Disposition: attachment; filename = information.xls");
    header("Content-Description: PHP4 Generated Data");

    $excel_file = "
    <table border='1'>
    <tr>
        <td>관람정보 제목</td>
        <td>관람정보 내용</td>
        <td>관람 날짜</td>
        <td>관람 주소</td>
    </tr>
    ";

    if($st_date && $en_date){
        $data = fetchAll("select * from watch where date >= ? and date <= ?", [$st_date, $en_date]);
    } else if($st_date && !$en_date){
        $data = fetchAll("select * from watch where date >= ?", [$st_date]);
    } else if(!$st_date && $en_date){
        $data = fetchAll("select * from watch where date <= ?", [$en_date]);
    } else {
        $data = fetchAll("select * from watch");
    }

    foreach($data as $rs){
        $excel_file .= "
        <tr>
            <td>$rs->tit</td>
            <td>$rs->con</td>
            <td>$rs->date</td>
            <td>$rs->loc</td>
        </tr>
        ";
    }

    $excel_file .= "</table>";

    echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
    echo $excel_file;
}