<h1>상품별 카테고리</h1>
<h3>제공된 item.json이 없음 (data.json으로 만듬)</h3>
<h5>판매순은 "구매상태가 구매 확정된 상품들 중 많이 팔린 상품 순으로 정렬" 인데 data.json에는 구매확정이 없으므로 그냥 재고 수량으로 만듬</h5>
<div class="d-flex-s sort">
    
    <a href="/category?cate=<?=$cate?>&type=1" class="btn btn-primary">인기순</a>
    <a href="/category?cate=<?=$cate?>&type=2" class="btn btn-primary">판매순</a>
    <a href="/category?cate=<?=$cate?>&type=3" class="btn btn-primary">가격순</a>
</div>

<div class="category-tab">
    <div class="d-flex-c">
        <?php foreach ($category as $item):
            if($item->category != '팬시') : ?>
            <a href="/category?cate=<?= $item->category ?>"
                class="<?= $cate == $item->category ? "active" : "" ?>"><?= $item->category ?></a>         
        <?php endif; endforeach; ?>
    </div>
</div>

<div class="d-grid-4 margin">
    <?php foreach($datas as $item) :  

if($item->category == "팬시") : 
    $item->category = "펜시";
endif;
    if($item->category == $cate) :
        ?>
        <div class="card">
            <img src="./resources/img/<?=$item->img?>.jpg" alt="" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">
                    제목: <a href="/detail?idx=<?=$item->idx?>"><?= $item->product ?></a>
                </h4>
                <p class="card-text">가격 :
                    <?= $item->price ?>
                </p>
                <p class="card-text">내용 :
                    <?= $item->longinfo ?>
                </p>
                <p class="card-text">제품 수량 :
                    <?= $item->quantity ?>
                </p>                
            </div>
            <i class="fa-solid fa-xmark sold-out" style="display: <?=$item->quantity == 0 ? "block":"none" ?>;"></i>
        </div>
    <?php endif; endforeach;  ?>
</div>