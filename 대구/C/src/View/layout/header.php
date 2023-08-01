<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <title>Document</title>
</head>
<body>

<div class="container">

<header>
    <?php
    if(isset($_SESSION['user'])) {
        ?>
        <a href="/logout">로그아웃</a>
        <?php
        if($_SESSION['user']->type==1) {
            ?>
            <a href="/mypage/tourlist/0">Mypage</a>
            <?php
        } else if($_SESSION['user']->type=="admin") {
            ?>
            <a href="/mypage/admin">Mypage</a>
            <?php
        }
    } else {
        ?>
        <a href="/login">로그인</a>
        <a href="/join">회원가입</a>
        <?php
    }

    ?>
    <a href="/tour">셔틀버스투어</a>

    
    

</header>