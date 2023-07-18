
<?php 

if(!isset($_SESSION['user']) || $_SESSION['user']['id'] != "admin") {
    msg("잘못된 접근입니다.");
}
?>
<h1>주문처리 페이지</h1>
<table class="table">
    <thead>
        <tr>
            <th>회원이름</th>
            <th>상품명</th>
            <th>수량</th>
            <th>상품가격</th>
            <th>할인 후 금액</th>
            <th>주소</th>
            <th>구매상태</th>
            <th>구매확정처리버튼</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($result as $item) : ?>            
            <tr>
                <td><?=$item->name?></td>
                <td><?=$item->product?></td>
                <td><?=$item->quantity?></td>
                <td><?=$item->price?></td>
                <td><?=$item->saleprice?></td>
                <td><?=$item->address?></td>
                <td><?=$item->state?></td>
                <td><a href="/ok?idx=<?=$item->idx?>" class="btn btn-primary">구매확정처리</a></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>