<h3 class="mt-5">회원가입</h3>

<form action="/join/process" method="POST" class="mt-3">
    <div class="input-group">
        <span class="input-group-text">아이디</span>
        <input type="text" class="form-control" name="id">
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">비밀번호</span>
        <input type="text" class="form-control" name="pw">
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">성명</span>
        <input type="text" class="form-control" name="name">
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">전화번호</span>
        <input type="text" class="form-control" name="tel">
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">회원구분</span>
        <select name="type" class="form-control">
            <option value="normal">일반회원</option>
            <option value="boss">숙박업소회원</option>
        </select>
    </div>
    <button class="btn btn-primary mt-3">회원가입</button>
</form>