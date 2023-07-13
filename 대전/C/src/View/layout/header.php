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
    <a href="/">홈</a>
    <?php
    if(isset($_SESSION['user'])) {
        ?>
        <a href="/logout" class="mt-5">로그아웃</a>
        <a href="#" class="mt-5">마이페이지</a>
        <?php
    } else {
        ?>
        <a href="/login" class="mt-5">Login</a>
        <a href="/join" class="mt-5">회원가입</a>
        <?php
    }
    ?>

    <a href="/acco/register">숙박업소등록</a>
    <a href="/room/register">객실등록</a>
    <a href="/room">객실목록</a>
    <a href="/acco/all/all">숙박업소</a>