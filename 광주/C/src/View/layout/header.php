<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/style.css">
    <title>Document</title>
</head>

<body>

    <?php
    if (!isset($_SESSION['user'])) {
    ?>
        <form action="/login/process" method="POST" class="login-form">
            <h5 class="mt-3">로그인</h5>
            <input type="text" class="form-control mt-3" value="Jimin1" name="id" placeholder="아이디">
            <input type="text" class="form-control mt-2" value="jimin12345" name="pw" placeholder="비밀번호">
            <button class="btn btn-primary mt-2">로그인</button>
        </form>
    <?php
    } else {
    ?>
        <div class="login-form" id="current">
            <h5>최근 본 상품</h5>
            <div id="current">
                <?php
                foreach ($_SESSION['product'] as $key => $value) {
                ?>
                    <a href="/product/<?= $_SESSION['product'][$key]->idx ?>"><img src="/img/<?= $_SESSION['product'][$key]->img ?>.jpg" alt=""></a>
                <?php
                }
                ?>
            </div>
        </div>
    <?php
    }
    ?>

    <div class="container">
        <?php
        if (!isset($_SESSION['user'])) {
        ?>
            <a href="/login">로그인</a>
            <a href="/login">회원가입</a>
        <?php
        } else {
        ?>
            <a href="/logout">로그아웃</a>
        <?php
        }
        ?>

        <?php
        if(isset($_SESSION['user']) && $_SESSION['user']->id=='admin') {
            ?>
            <a href="/admin/order">주문처리</a>
            <a href="/admin/graph">판매현황보기</a>
            <?php
        } else {
            ?>
            <a href="/shop">쇼핑하기</a>
            <?php
        }
        ?>