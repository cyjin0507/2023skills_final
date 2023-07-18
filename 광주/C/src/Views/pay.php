<?php

if(!isset($_SESSION['user'])){
    msgAndGo("로그인을 먼저 해주세요", "/login");
}

if($_SESSION['user']['id'] != "admin") {
    $level = $login->level;
    if ($level == "브론즈") {
        $level = 5 / 100;
    } else if ($level = "실버") {
        $level = 10 / 100;
    } else if ($level = "골드") {
        $level = 15 / 100;
    } else if ($level = "VIP") {
        $level = 20 / 100;
    }
} else {
    $level = 0;
}
?>
<h1>상품 결제 페이지</h1>
<div>

<img src="./resources/img/<?= $result->img ?>.jpg" alt="">
<h3>상품명 :
    <?= $result->product ?>
</h3>
<h5>상품가격
    <?= $result->price ?>
</h5>
<h5>상품 수량 :
    <?=  $result->quantity ?>
</h5>
<h5>상품상세정보:
    <?= $result->longinfo ?>
</h5>
<h5>총 상품 금액(수량) : <span class="price">
        <?= ($result->price * $cnt) - (($result->price * $cnt) * $level) ?>
    </span></h5>
</div>

<div>
    <form action="/pay" method="post">
        <h3>주문자 정보 : <?=$login->name?></h3>
        <p>주문 수량 : <?=$cnt?></p>
        <input type="text" name="address" id="address" placeholder="집주소" required>
        <input type="hidden" name="quantity" value="<?=$result->quantity?>">
        <input type="hidden" name="sale" value="<?= ($result->price * $cnt) - (($result->price * $cnt) * $level) ?>">
        <input type="hidden" name="cnt" value="<?=$cnt?>">
        <input type="hidden" name="productid" value="<?=$result->idx?>">
        <input type="submit" value="결제하기" class="btn btn-primary">
    </form>
</div>