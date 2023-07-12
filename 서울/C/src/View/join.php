<h3 class="mt-5">회원가입</h3>

<form action="/join/process" method="POST" class="mt-3">
    <div class="input-group">
        <span class="input-group-text">E-mail</span>
        <input type="email" class="form-control" name="email" required>
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">이름</span>
        <input type="text" class="form-control" name="name" required>
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">비밀번호</span>
        <input type="password" class="form-control" name="pw" required>
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">비밀번호 확인</span>
        <input type="password" class="form-control" name="pw_check" required>
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">전화번호</span>
        <input type="tel" class="form-control" name="tel" required>
    </div>
    <button class="btn btn-primary mt-2">로그인</button>
</form>