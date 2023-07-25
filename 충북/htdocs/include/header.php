<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./jquery-ui-1.12.1.custom/external/jquery/jquery.js"></script>
    <script src="./jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <script src="./bootstrap-5.2.0-dist/js/bootstrap.js"></script>
    <script src="./script/script.js"></script>
    <link rel="stylesheet" href="/bootstrap-5.2.0-dist/css/bootstrap.css">
    <link rel="stylesheet" href="/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="/style/style.css">
</head>
<body>
    <input type="checkbox" name="ham" id="ham">
    <div class="ham position-fixed">
        <label for="ham" class="lab position-fixed text-center">
            <i class="fa fa-align-justify"></i>
        </label>

        <div class="log d-flex w-100 position-fixed">
            <label for="ham" class="back"></label>
            <div class="con">
                <a href="/" class="logo mb-5"></a>
                <a href="#">투어 소개</a>
                <a href="#">인사말</a>
                <a href="/sub1">독립기념관</a>
                <a href="#">오시는길</a>
                <a href="#" class="mt-3 d-flex">투어 정보</a>
                <a href="#">관람 정보</a>
                <a href="#">관람 일정</a>
                <a href="#" class="mt-3 d-flex">투어 추천</a>
                <a href="#">투어 예약</a>
                <a href="#">투어 추천</a>
                <a href="#" class="mt-3 d-flex">투어 후기</a>
                <a href="#">이벤트행사</a>
                <a href="#">후기 이벤트</a>
                
            </div>
        </div>
    </div>

    <header>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <a href="/" class="logo d-flex"></a>
                </div>
                <div class="col-6 d-flex position-relative navi">
                    <a href="#" class="navi1">투어 소개</a>
                    <div class="box box1 position-absolute">
                        <a href="/sub1">독립기념관</a> <br>
                        <a href="#">유관순 기념관</a> <br>
                        <a href="#">홍대용 과학관</a>
                    </div>
                    <a href="#" class="navi2">투어 정보</a>
                    <div class="box box2 position-absolute">
                        <a href="/info">관람 정보</a> <br> 
                        <a href="/calender">관람 일정</a>
                    </div>
                    <a href="#" class="navi3">투어 추천</a>
                    <div class="box box3 position-absolute">
                        <a href="/reser">투어 예약</a> <br>
                        <a href="#">투어 추천</a>
                    </div>
                    <a href="#" class="navi4">투어 후기</a>
                    <div class="box box4 position-absolute">
                        <a href="#">이벤트 행사</a> <br>
                        <a href="#">후기 게시판</a>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-end">
                    <?php
                        if($ids == ""){
                    ?>
                        <p class="aa" id="lo_btn">로그인</p> <br>
                        <p class="aa" id="si_btn">회원가입</p>
                    <?php
                        } else {
                    ?>
                        <a href="/logout">로그아웃</a> <br>
                        <p class="aa"><?php echo $_SESSION['names']; ?></p>
                    <?php
                        }
                    ?>
                </div>
            </div>
        </div>
    </header>

    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title fs-5" id="loginLabel">Login</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="/login" method="post">
                    <div class="modal-body">
                        <label for="lo_id">아이디를 입력하세요</label>
                        <input type="text" name="lo_id" id="lo_id" class="form-control mb-3">
                        <label for="lo_pw">비밀번호를 입력하세요</label>
                        <input type="password" name="lo_pw" id="lo_pw" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn1">로그인</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="signup" tabindex="-1" aria-labelledby="signupLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title fs-5" id="signupLabel">signup</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="/signup" method="post">
                    <div class="modal-body">
                        <label for="si_id">아이디를 입력하세요</label>
                        <div class="input-group mb-3">
                            <input type="text" name="si_id" id="si_id" class="form-control">
                            <a href="/id_check" class="btn btn3">아이디 중복확인</a>
                        </div>
                        <label for="si_pw">비밀번호를 입력하세요</label>
                        <input type="password" name="si_pw" id="si_pw" class="form-control mb-3">
                        <label for="si_pw2">비밀번호를 한번 더 입력하세요</label>
                        <input type="password" name="si_pw2" id="si_pw2" class="form-control mb-3">
                        <label for="si_name">이름을 입력하세요</label>
                        <input type="text" name="si_name" id="si_name" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn1">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    </div>