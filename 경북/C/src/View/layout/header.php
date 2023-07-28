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

        <?php
        if(isset($_SESSION['user'])) {
            ?>
            <a href="/logout" class="btn btn-primary mt-3">로그아웃</a>
            <a href="#" class="btn btn-primary mt-3">게임관리</a>
            <a href="#" class="btn btn-primary mt-3">리뷰관리</a>
            <?php
        } else {
            ?>
            <a href="/login" class="btn btn-primary mt-3">로그인</a>
            <?php
        }
        ?>

        <a href="/place" class="btn btn-success mt-3">천안의 명소</a>
        <a href="/game/snack" class="btn btn-success mt-3">뱀게임</a>
