<h1 class="mt-5">마이페이지</h1>
<h5 class="mt-3">내 포인트 : <?=$_SESSION['user']->point?>점</h5>

<h3 class="mt-5">명물 장바구니</h3>

<table class="table mt-3">
    <thead>
        <tr>
            <th>이름</th>
            <th>포인트</th>
            <th>개수</th>
            <th>총 포인트</th>
            <th>삭제</th>
            <th>구매</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($basketList as $key=>$value) {
            ?>
            <tr>
                <td><?=$basketList[$key]->name?></td>
                <td><?=$basketList[$key]->point?></td>
                <td>1</td>
                <td><?=$basketList[$key]->point?></td>
                <td><a href="/basket/delete/<?=$basketList[$key]->bidx?>" class="btn btn-danger">삭제</a></td>
                <td><a href="/purchase/process/<?=$basketList[$key]->idx?>/<?=$basketList[$key]->bidx?>/<?=$basketList[$key]->point?>/1" class="btn btn-primary">구매</a></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<h3 class="mt-5">명물 구매목록</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>이름</th>
            <th>포인트</th>
            <th>총 포인트</th>
            <th>날짜</th>
            <th>삭제</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($purchaseList as $key=>$value) {
            ?>
            <tr>
                <td><?=$purchaseList[$key]->name?></td>
                <td><?=$purchaseList[$key]->point?></td>
                <td><?=$purchaseList[$key]->point * $purchaseList[$key]->count?></td>
                <td><?=$purchaseList[$key]->create_date?></td>
                <td><a href="/purchase/delete/<?=$purchaseList[$key]->idx?>" class="btn btn-danger">삭제</a></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<style>
    thead {
        background-color: #333;
        color: white;
    }

    th, td {
        text-align: center;
    }
</style>