<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>

<div class="container">
    <div id="user-control">
    <?php
    if(isset($_SESSION['user'])) {
      ?>
      <a href="/logout" class="btn btn-primary mt-5">로그아웃</a>
      <a href="/mypage" class="btn btn-primary mt-5">마이페이지</a>
      <?php
    } else {
      ?>
      <button class="btn btn-primary mt-5" id="login-open-btn">로그인</button>
      <button class="btn btn-primary mt-5" id="join-open-btn">회원가입</button>
      <?php
    }
    ?>
    </div>

    <a href="/recommand">추천여행 메뉴</a>
    <a href="/gallery">갤러리</a>

    <div class="modal" id="join-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">회원가입</h5>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <span class="input-group-text">아이디</span>
                    <input type="text" class="form-control" id="join-id">
                </div>
                <button class="btn btn-primary mt-1" id="id-check-btn">아이디 중복확인</button>
                <div class="input-group mt-3">
                    <span class="input-group-text">패스워드</span>
                    <input type="text" class="form-control" id="join-pw">
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">성명</span>
                    <input type="text" class="form-control" id="join-name">
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">연락처</span>
                    <input type="text" class="form-control" id="join-tel">
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">주소</span>
                    <input type="text" class="form-control" id="join-addr">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="join-btn">회원가입</button>
              <button type="button" class="btn btn-secondary close" data-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
    </div>

    <div class="modal" id="login-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">로그인</h5>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <span class="input-group-text">아이디</span>
                    <input type="text" class="form-control" id="login-id">
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">패스워드</span>
                    <input type="text" class="form-control" id="login-pw">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="login-btn">로그인</button>
              <button type="button" class="btn btn-secondary close" data-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
    </div>


    <script src="/script/join.js"></script>
    <script src="/script/login.js"></script>