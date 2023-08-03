<h3 class="mt-5">주문처리 페이지</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>회원이름</th>
            <th>상품명</th>
            <th>수량</th>
            <th>상품가격</th>
            <th>할인 후 금액</th>
            <th>주소</th>
            <th>구매상태</th>
            <th>구매확정버튼</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($orderList as $key=>$value) {
            ?>
            <tr>
                <td><?=$orderList[$key]->name?></td>
                <td><?=$orderList[$key]->product?></td>
                <td><?=$orderList[$key]->quantity?></td>
                <td><?=$orderList[$key]->price?></td>
                <td><?=$orderList[$key]->dprice?></td>
                <td><?=$orderList[$key]->address?></td>
                <td><?=$orderList[$key]->state?></td>
                <td>
                    <?php
                    if($orderList[$key]->state == "불확정") {
                        ?>
                        <a href="/product/decide/<?=$orderList[$key]->idx?>" class="btn btn-primary">구매확정</a>
                        <?php
                    } else {
                        ?>
                        <button class="btn btn-secondary">확정</button>
                        <?php
                    }
                    ?>
                </td>
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