<h3 class="mt-5">추천상품</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>상품명</th>
            <th>상품가격</th>
            <th>상품이미지</th>
            <th>상품간략정보</th>
            <th>재고수량</th>
            <th>카테고리</th>
            <th>조회수</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($data as $key=>$value) {
            ?>
            <tr>
                <td style="width: 200px;"><a href="/product/<?=$data[$key]->idx?>"><?=$data[$key]->product?><?=$data[$key]->quantity <= 0 ? '<span style="color:red">(품절)</span>' : ''?></a></td>
                <td><?=$data[$key]->price?></td>
                <td><img src="/img/<?=$data[$key]->img?>.jpg" alt=""></td>
                <td><?=$data[$key]->shortinfo?></td>
                <td><?=$data[$key]->quantity?></td>
                <td><?=$data[$key]->category?></td>
                <td><?=$data[$key]->hit?></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<div style="margin-top: 100px; display: flex; justify-content: space-between; gap: 20px;">
<?php
$list = ['의류', '펜시', '생활용품', '식품'];
for($i=0; $i<count($list); $i++) {
    $count = 0;
    ?>
    <div>
    <h4><?=$list[$i]?></h4>
    <a href="/category/<?=$i?>/0" class="btn btn-primary">더보기</a>
    <table class="table mt-3">
        <thead>
            <tr>
                <th>상품명</th>
                <th>상품가격</th>
            </tr>
        </thead>
        <tbody>
    <?php
    foreach($category as $key=>$value) {
            if($category[$key]->category == $list[$i]) {
            ?>
            <tr>
                <td><?=$category[$key]->product?><?=$category[$key]->quantity <= 0 ? '<span style="color:red">(품절)</span>' : ''?></td>
                <td><?=$category[$key]->price?></td>
            </tr>
            <?php
            $count++;
        }
        if($count >= 4) {
            break;
        }
        
    }
    ?>
    </tbody>
    </table>
    </div>
    <?php
}
?>
</div>

<style>
    thead {
        background-color: #333;
        color: white;
    }

    th, td {
        text-align: center;
    }

    table img {
        width: 70px;
        height: 70px;
        object-fit: cover;
    }

</style>