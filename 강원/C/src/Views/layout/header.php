<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="./resources/css/style.css">

<script src="https://code.jquery.com/jquery-3.7.0.min.js"
    integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
    
    <header class="d-flex-b">
        <?php if(isset($_SESSION['user'])) : ?>
            <a href="/logout">로그아웃</a>
            <?php else : ?>
                <a href="/sign">회원가입</a>
                <a href="/login">로그인</a>
        <?php endif; ?>
        <a href="/entry">출품신청</a>
        <a href="/schedule">상영일정</a>
        <a href="/search">상영작검색</a>
        <a href="/join">콘테스트 참여하기</a>
        <a href="/contest">영화티저 콘테스트</a>
    </header>
