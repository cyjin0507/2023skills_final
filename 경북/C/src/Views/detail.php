<h1>명소 자세히 보기 페이지</h1>

<h3>명소의 정보</h3>
<div>
    <img src="./resources<?= $place->image ?>" alt="">
    <h5>제목 :
        <?= $place->title ?>
    </h5>
    <h5>거리 :
        <?= $place->distance ?>
    </h5>
</div>
<h3>별점 영역</h3>
<?php
$rate = 0;
foreach ($reviews as $item):
    $rate += $item->rate;
endforeach;
$star = round($rate / count($reviews), 1)
    ?>
<h5>별점 :
    <?= $star ?>
    <span class="star">
        ★★★★★
        <span style="width: <?= (($star * 2) * 10) ?>%;">★★★★★</span>
    </span>
</h5>

<h5>별점 그래프</h5>
<div id="chart-container">
    <svg id="chart"></svg>
    <div id="x-label">날짜</div>
    <div id="y-label">평균 별점</div>
</div>

<div class="hidden">
    <?= json_encode($reviews)?>
</div>

<h3>리뷰 목록</h3>
<h5>리뷰 갯수 :
    <?= count($reviews) ?>
</h5>
<div class="d-grid-4">
    <?php foreach ($reviews as $item): ?>
        <div class="card">
            <div class="card-body">
                <p class="card-text">방문날짜 :
                    <?= $item->visit ?>
                </p>
                <p class="card-text">별점 :
                    <?= $item->rate ?>
                </p>
                <p class="card-text">내용 :
                    <?= $item->text ?>
                </p>
            </div>
        </div>
    <?php endforeach; ?>
</div>
<a href="/review?idx=<?= $place->idx ?>&title=<?= $place->title ?>" class="btn btn-primary review-btn">리뷰 작성버튼</a>
<script src="./resources/js/chart.js"></script>