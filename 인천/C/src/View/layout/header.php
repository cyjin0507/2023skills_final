<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>

<div class="container">

    <header class="mt-5">
        <?php
        if(isset($_SESSION['user'])) {
            ?>
            <a href="/logout">로그아웃</a>
            <?php
            if($_SESSION['user']->id == 'admin') {
                ?>
                <a href="/admin">관리자</a>
                <?php
            } else {
                ?>
                <a href="/basket">장바구니</a>
                <?php
            }
        } else {
            ?>
            <a href="/login">로그인</a>
            <a href="#">회원가입</a>
            <?php
        }
        ?>
        <a href="/goods">특산품 구입</a>
    </header>