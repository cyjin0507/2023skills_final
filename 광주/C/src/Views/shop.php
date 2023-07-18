<h1>추천 상품</h1>
<h3>추천 상품은 따로 내용같은게 없기 때문에 <br> 제목을 눌러도 상세페이지가 없도록 제작함</h3>
<?php if (isset($_SESSION['user'])): ?>
    <h3>10~19세,</h3>
    <div class="d-grid-4">
        <?php foreach ($reserve['ten'] as $item): ?>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">제품 :
                       <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                    </h4>
                    <p class="card-text">구매 수량 :
                        <?= $item->count ?>
                    </p>
                </div>
                
                <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->count == 0 ? "block":"none" ?>;"></i>
            </div>
        <?php endforeach; ?>
    </div>
    <h3>20~29세</h3>
    <div class="d-grid-4">
        <?php foreach ($reserve['twenty'] as $item): ?>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">제품 :
                       <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                    </h4>
                    <p class="card-text">구매 수량 :
                        <?= $item->count ?>
                    </p>
                </div>
                <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->count == 0 ? "block":"none" ?>;"></i>
            </div>
        <?php endforeach; ?>
    </div>
    <h3>30~39세</h3>
    <div class="d-grid-4">
        <?php foreach ($reserve['thirty'] as $item): ?>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">제품 :
                       <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                    </h4>
                    <p class="card-text">구매 수량 :
                        <?= $item->count ?>
                    </p>
                </div>
                <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->count == 0 ? "block":"none" ?>;"></i>
            </div>
        <?php endforeach; ?>
    </div>
    <h3>40~49세</h3>
    <div class="d-grid-4">
        <?php foreach ($reserve['fourty'] as $item): ?>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">제품 :
                       <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                    </h4>
                    <p class="card-text">구매 수량 :
                        <?= $item->count ?>
                    </p>
                </div>
                <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->count == 0 ? "block":"none" ?>;"></i>
            </div>
        <?php endforeach; ?>
    </div>

<?php else: ?>
    <div class="d-grid-4">
        <?php foreach ($reserve as $item): ?>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">제품 :
                       <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                    </h4>
                    <p class="card-text">구매 수량 :
                        <?= $item->count ?>
                    </p>
                </div>
                <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->count == 0 ? "block":"none" ?>;"></i>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>
<div class="margin"></div>
<h1>각 카테고리별 상품 중 <br> 가장 많이 구매한 상품 순으로 4개씩</h1>
<h3>구매수량이 있는건 reserve 테이블인데 data 테이블에 카테고리가 있음 (data 테이블에 있는건 재고수량임 구매수량x) 또한 둘은 완전히 다른 상품에 다른 테이블임 그래서 이건 구현 불가</h3>
<h5>그냥 판매수량으로 판단하고 만듬</h5>
<div class="d-grid-4">
    <?php foreach ($datas as $item): ?>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">제품 :
                   <a href="/detail?idx=<?=$item->idx?>"> <?= $item->product ?></a>
                </h4>
                <p class="card-text">판매 수량 :
                    <?= $item->quantity ?>
                </p>
                <p class="card-text">카테고리 :
                    <?= $item->category ?>
                </p>
                <a href="/category?cate=<?=$item->category?>" class="btn btn-primary">더보기</a>
            </div>
            <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->quantity == 0 ? "block":"none" ?>;"></i>
        </div>
    <?php endforeach; ?>
</div>