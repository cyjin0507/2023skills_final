<?php 
if(!isset($_SESSION['user'])) {
    msgAndGo("비회원은 접근할 수 없습니다.", "/login");
}
?>

<h1>출품신청</h1>



<form action="/entry" method="post">
    <input type="text" name="name" id="name" placeholder="출품자 이름">
    <input type="text" name="id" id="id" placeholder="아이디">
    <input type="text" name="movie" id="movie" placeholder="영화목록">
    러닝 타임 : <input type="number" name="time" id="time" placeholder="러닝타임">
    <input type="text" name="year" id="year" placeholder="제작년도">
    <select name="type" id="type">
        <option value="0">극영화</option>
        <option value="1">다큐멘터리영화</option>
        <option value="2">애니메이션</option>
        <option value="3">기타</option>
    </select>
    <button>출품하기</button>
</form>

