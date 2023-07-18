<?php

if(isset($_SESSION['user'])) {
    msgAndGo('이미 로그인 하셨습니다.', "/");
}
?>

<form action="/login" method="post">
    <div class="d-flex-c">
        <input type="text" name="id" id="id" placeholder="아이디">
        <input type="password" name="pw" id="pw" placeholder="비밀번호">
        <button>로그인</button>
    </div>
</form>