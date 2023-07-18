<?php

if (isset($_SESSION['user'])) {
    msg("로그인한 회원은 접근할 수 없습니다.");
}
?>

<h1>회원가입</h1>
<form action="/sign" method="post">
    <input type="text" name="id" id="id" placeholder="아이디" required oninput="this.value = this.value
.replace(/[^0-9A-z]/g, '')
.replace(/(\..*)\./g, '$1');">
    <input type="password" name="pw" minlength="8" id="pw" placeholder="비밀번호" required>
    <input type="text" maxlength="4" name="name" id="name" placeholder="이름" required>
    <button class="btn btn-primary">회원가입</button>
</form>