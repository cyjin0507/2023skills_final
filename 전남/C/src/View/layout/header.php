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
    <a href="/logout" class="mt-3 btn btn-primary">로그아웃</a>
    <a href="/mypage" class="mt-3 btn btn-primary"><?=$_SESSION['user']->name?>(<?=$_SESSION['user']->id?>)</a>
    <?php
} else {
    ?>
    <a href="/login" class="mt-3 btn btn-primary">로그인</a>
    <a href="/join" class="mt-3 btn btn-primary">회원가입</a>
    <?php
}
?>
<a href="/purchase" class="mt-3 btn btn-info">명물 구매</a>

<select name="" id="" class="form-control mt-3" style="width: 200px;">
    <option value="">한국어</option>
    <option value="">English</option>
    <option value="">繁體中文</option>
    <option value="">日本語</option>
</select>