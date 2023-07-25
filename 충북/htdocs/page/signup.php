<?php

// 아이디 중복확인
if($_POST){
    if(!$si_id || !$si_pw || !$si_name){
        alert("모든 값을 입력하세요");
        back();
    }
    
    if(!preg_match('/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/', $si_id)){
        alert("아이디는 영문과 숫자 조합이여야 합니다");
        back();
    }

    if((!preg_match('/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/', $si_pw)) || (strlen($si_pw) < 8)){
        alert("비밀번호는 영어와 숫자 8자리 이상이여야 합니다");
        back();
    }

    if($si_pw != $si_pw2){
        alert("비밀번호와 비밀번호 확인 값이 다릅니다");
        back();
    }

    $pw = hash("sha256", $si_pw);
    sql("insert into user (id, pw, name) values ('$si_id', '$pw', '$si_name')");
    alert("회원가입이 완료되었습니다");
    move("/");
}