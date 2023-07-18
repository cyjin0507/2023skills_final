<h1>상품 상세 페이지</h1>
<?php if (!isset($_SESSION['user'])): ?>
    <div>

        <img src="./resources/img/<?= $result->img ?>.jpg" alt="">
        <h3>상품명 :
            <?= $result->product ?>
        </h3>
        <h5>상품가격
            <?= $result->price ?>
        </h5>
        <h5>상품상세정보:
            <?= $result->longinfo ?>
        </h5>
        <input type="number" name="" value="1" min="1" id="inputPrice">
        <input type="hidden" name="" value="<?= $result->price ?>" id="priceValue">
        <h5>총 상품 금액(수량) : <span class="price">
                <?= $result->price ?>
            </span></h5>
        <a href="/pay?idx=<?= $result->idx ?>" class="btn btn-primary">구매</a>
    </div>
<?php else:
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
    <div>

        <img src="./resources/img/<?= $result->img ?>.jpg" alt="">
        <h3>상품명 :
            <?= $result->product ?>
        </h3>
        <h5>상품가격
            <?= $result->price ?>
        </h5>
        <h5>상품상세정보:
            <?= $result->longinfo ?>
        </h5>        
        <input type="hidden" name="price" value="<?= $result->price - ($result->price * $level) ?>" id="priceValue">
        <form action="/pay" method="get">
            <input type="hidden" name="idx" value="<?=$result->idx?>">            
            <input type="number" name="cnt" value="1" min="1" id="inputPrice">            
            <input type="submit" value="구매" class="btn btn-primary" <?=$result->quantity == 0 ? "disabled" : ""?>>
        </form>
        <h5>총 상품 금액(수량) : <span class="price">
                <?= $result->price - ($result->price * $level) ?>
            </span></h5>
    </div>

<?php endif; ?>
<h1>리뷰</h1>
<?php
$rate = 0.0;
$cnt = 0;
foreach ($reviews as $item) :
    if($item->rate != 0) :
        $rate += (float) $item->rate;        
        $cnt++;
    endif;
endforeach;

?>
<h3>글의 개수
    <?= count($reviews) ?> <br> 구매 평점 :
    <?= $cnt != 0 ? round($rate / $cnt, 2) : 0 ?>
</h3>
<div class="d-flex-b">
    <?php if (isset($_SESSION['user'])): ?>
        <h5>리뷰 작성</h5>
        <form action="/review" method="post">
            <?php if($isReserve && !$isReview) : ?>
            평점 : <input type="number" step="0.1" min="0.1" max="5" name="rate" id="rate" required placeholder="평점">
            <?php endif; ?>
            리뷰 제목 : <input type="text" name="title" id="title" placeholder="리뷰 제목" required>
            리뷰 내용 : <textarea name="text" id="text" cols="30" rows="10" placeholder="리뷰 내용" required></textarea>
            <input type="hidden" name="name" value="<?= $login->name?>">
            <input type="hidden" name="productid" value="<?= $result->idx ?>">
            <input type="submit" value="리뷰 등록" class="btn btn-primary">
        </form>
    <?php endif; ?>
</div>
<div class="d-grid-4">
    <?php foreach ($reviews as $item):
        if ($item->productid == $result->idx):

            ?>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">제목 : <?= $item->title ?></h5>
                    <p class="card-text">내용 : <?= $item->content ?></p>
                    <p class="card-text">평점 : <?= $item->rate == 0? '이미 줌' : $item->rate ?></p>
                    <p class="card-text">이름 : <?= $item->name ?></p>
                    <p class="card-text">날짜 : <?= $item->date ?></p>
                </div>
            </div>

        <?php endif; endforeach; ?>
</div>
<div class="margin"></div>