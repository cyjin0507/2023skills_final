<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
        <div class="d-flex-c">
            <header>
                <a href="/shop.php">shop.php</a>
                <?php
                if (!isset($_SESSION['user'])): ?>
                    <a href="#">회원가입</a>
                    <a href="/login">로그인</a>
                    <div class="position">
                        <form action="/login" method="post">
                            <input type="text" name="id" id="id" placeholder="아이디">
                            <input type="password" name="pw" id="pw" placeholder="비밀번호">
                            <button>로그인 버튼</button>
                        </form>
                    </div>
                <?php elseif (isset($_SESSION['user']) && $_SESSION['user']['id'] == "admin"): ?>
                    <a href="/manageOrder">주문처리</a>
                    <a href="/manageSale">판매현황보기</a>
                    <a href="/logout">로그아웃</a>
                    <div class="position">
                        <a href="/manageOrder">주문처리</a>
                        <a href="/manageSale">판매현황보기</a>
                        <a href="/logout">로그아웃</a>                        
                    </div>
                <?php else: ?>
                    <a href="/logout">로그아웃</a>
                    <a href="#">마이페이지</a>
                    <div class="position">
                        <a href="/logout">로그아웃</a>
                        <a href="#">마이페이지</a>
                        <div class="recent margin">
                            <h5>최근 본 상품</h5>
                            <?php
                            $recentProduct = !isset($_SESSION['recent']) ? array() : $_SESSION['recent'];
                            if ($recentProduct != array()):
                                foreach ($recentProduct as $item):
                                    if ($item['user'] == $_SESSION['user']['id']):
                                        ?>
                                        <a href="/detail?idx=<?= $item['idx'] ?>"><?= $item['product'] ?></a>
                                    <?php endif; endforeach; else: ?>
                            <p>최근 본 상품이 없습니다.</p>
                        <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </header>
        </div>