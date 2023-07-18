<?php

if (!isset($_SESSION['user']) || $_SESSION['user']['id'] != "admin") {
    msg("잘못된 접근입니다.");
}
?>
<h1>판매현황보기</h1>

<form action="/manageSale" method="post" name="form">
    시작일: <input type="date" name="start" value="<?= isset($start) ? $start : "" ?>">
    종료일: <input type="date" name="end" value="<?= isset($end) ? $end : "" ?>">
    <input type="button" value="보기 버튼" class="btn btn-primary submit-btn">
</form>

<?php

if (isset($firstChart) && isset($secondChart)): ?>

    <h3>연령대별로 구매확정일자를 기준으로 시작일~종료일까지의 기간 중에서 가장 많이 구매한 상품</h3>
    <div class="chart-container">
        <?php foreach ($firstChart as $row): ?>
            <?php
            $maxValue = max(array_column($firstChart, 'max_quantity')); // 데이터의 최댓값을 가져옵니다.                        
            $barHeight = ($row->max_quantity / $maxValue) * 100; // 막대의 높이 계산 (최댓값 기준으로 비율 계산)
            ?>
            <div class="bar" style="height: <?= $barHeight ?>%"></div>
            <div class="bar-label">
                <?= $row->age_range ?>
            </div>
            <div class="bar-top-label">
                <?= $row->product ?>
            </div>
        <?php endforeach; ?>
    </div>
    <h3>지역별로 구매확정일자를 기준으로 시작일~종료일까지의 기간 중에서 가장 많이 구매한 상품</h3>
    <div class="chart-container">
        <?php foreach ($secondChart as $row): ?>
            <?php
            $maxValue = max(array_column($secondChart, 'max_quantity')); // 데이터의 최댓값을 가져옵니다.                        
            $barHeight = ($row->max_quantity / $maxValue) * 100; // 막대의 높이 계산 (최댓값 기준으로 비율 계산)
            ?>
            <div class="bar" style="height: <?= $barHeight ?>%"></div>
            <div class="bar-label">
                <?= $row->area ?>
            </div>
            <div class="bar-top-label">
                <?= $row->product ?>
            </div>
        <?php endforeach; ?>
    </div>
    <h3>각 지역별로 10대들이 가장 많이 구매한 상품</h3>
    <table class="table">
        <thead>
            <tr>
                <th>지역별</th>
                <th>상품명</th>
                <th>상품 이미지</th>
                <th>상품 금액</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($ten as $item):
                ?>
                <tr>
                    <td>
                        <?= $item->area ?>
                    </td>
                    <td>
                        <?= $item->product ?>
                    </td>
                    <td>상품이미지는 data.json임</td>
                    <td>
                        <?= $item->price ?>
                    </td>
                    <td>조회수 또한 data.json임</td>
                </tr>

            <?php endforeach; ?>
        </tbody>
    </table>

<?php endif; ?>