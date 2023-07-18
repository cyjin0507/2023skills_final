<?php

if (isset($_SESSION['user'])) {
    msg("로그인한 회원은 접근할 수 없습니다.");
}
?>

<h1>로그인</h1>
<form action="/login" method="post">
    <input type="text" name="id" id="id" placeholder="아이디" required oninput="this.value = this.value
.replace(/[^0-9A-z]/g, '')
.replace(/(\..*)\./g, '$1');">
    <input type="password" name="pw" id="pw" placeholder="비밀번호" required>    
    <button class="btn btn-primary">로그인</button>
</form>