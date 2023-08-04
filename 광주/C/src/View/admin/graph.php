<h3 class="mt-5">판매현황보기</h3>

<h5 class="mt-5">연도설정</h5>
<form class="d-flex mt-3" style="width: 800px; gap: 20px;">
    <div class="input-group">
        <span class="input-group-text">시작일</span>
        <input type="date" name="start" class="form-control" value="2007-01-01">
    </div>
    <div class="input-group">
        <span class="input-group-text">종료일</span>
        <input type="date" name="end" class="form-control">
    </div>
    <button class="btn btn-primary" style="width: 120px;">검색</button>
</form>

<?php
$point = "";
$keyword = "";
foreach ($data as $key => $value) {
    $point .= ($data[$key]->max_quantity . ',');
    $keyword .= ($data[$key]->product . ' -> ' . $data[$key]->age_group . ',');
}
$point = substr($point, 0, strlen($point) - 1);
$keyword = substr($keyword, 0, strlen($keyword) - 1);

$point2 = "";
$keyword2 = "";
foreach ($data2 as $key => $value) {
    $point2 .= ($data2[$key]->total_quantity . ',');
    $keyword2 .= ($data2[$key]->product . ' -> ' . $data2[$key]->region . ',');
}
$point2 = substr($point2, 0, strlen($point2) - 1);
$keyword2 = substr($keyword2, 0, strlen($keyword2) - 1);
?>

<div style="display: flex; gap: 50px; margin-top: 100px;">
    <h5 class="mt-5">연령대별</h5>
    <img class="mt-3" src="/graph.php?h_bar=<?= $point ?>&keyword=<?= $keyword ?>" alt="">

    <h5 class="mt-5">지역별</h5>
    <img class="mt-3" src="/graph.php?h_bar=<?= $point2 ?>&keyword=<?= $keyword2 ?>" alt="">
</div>