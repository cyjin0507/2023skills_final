<h3 class="mt-5">명물 구매</h3>
<table class="mt-3 table">
    <thead>
        <tr>
            <th>이미지</th>
            <th>이름</th>
            <th>소개</th>
            <th>포인트(가격)</th>
            <th>장바구니</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><img src="/resources/img/명물/<?=$list[$key]->image?>" alt=""></td>
                <td><?=$list[$key]->name?></td>
                <td style="width: 500px;"><?=$list[$key]->description?></td>
                <td><?=$list[$key]->point?></td>
                <td><a href="/purchase/basket/process/<?=$list[$key]->idx?>" class="btn btn-primary">장바구니</a></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>


<style>
    table img {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }

    thead {
        background-color: #333;
        color: white;
    }

    th, td {
        text-align: center;
    }

</style>