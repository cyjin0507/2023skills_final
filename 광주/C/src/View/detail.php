<h3 class="mt-5">상품 상세 페이지</h3>
<div class="mt-5">
    <div>
        <small>상품명 : </small>
        <big><?=$data->product?></big>
    </div>
    <div class="mt-3">
        <small>상품 이미지 : </small>
        <img src="/img/<?=$data->img?>.jpg" alt="">
    </div>
    <div class="mt-3">
        <small>상품상세정보 : </small>
        <big><?=$data->longinfo?></big>
    </div>
    <div class="mt-3">
        <small>상품가격 : </small>
        <big id="price"><?=$data->price?></big>
    </div>
    <div class="mt-3">
        <small>수량 : </small>
        <input type="number" class="form-control" style="width: 200px;" value="1">
    </div>
    <div class="mt-3">
        <small>총 상품 금액 : </small>
        <big id="total"></big>
    </div>
</div>
<form action="/payment" method="GET" class="mt-5">
    <input type="hidden" name="idx" value="<?=$data->idx?>">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="total" value="1">
    <?php
    if($data->quantity <= 0) {
        ?>
        <button type="button" class="btn btn-secondary">품절됨</button>
        <?php
    } else {
        ?>
        <button class="btn btn-primary">상품결제</button>
        <?php
    }
    ?>
</form>

<h5 class="mt-5">리뷰</h5>
<table class="table mt-3">
    <thead>
        <tr>
            <th>제목</th>
            <th>내용</th>
            <th>평점</th>
            <th>작성자</th>
            <th>작성일</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $score = 0;
        $cnt = count($review);
        foreach($review as $key=>$value) {
            if($score != '') {
                $score += $review[$key]->score;
            }
            ?>
            <tr>
                <td><?=$review[$key]->title?></td>
                <td style="width: 600px;"><?=$review[$key]->content?></td>
                <td><?=$review[$key]->score?></td>
                <td><?=$review[$key]->name?></td>
                <td><?=$review[$key]->create_date?></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>
<button class="btn btn-primary">총 리뷰갯수 : <?=$cnt?>개 / 평균평점 : <?=$cnt==0 ? 0 : round($score / $cnt)?>점</button>

<?php if(isset($_SESSION['user'])) { ?>

<h5 class="mt-5">리뷰 작성</h5>
<form action="/review/process" method="POST" class="mt-3">
    <input type="hidden" name="idx" value="<?=$data->idx?>">
    <div class="input-group">
        <span class="input-group-text">제목</span>
        <input type="text" class="form-control" name="title">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">내용</span>
        <textarea name="content" class="form-control"></textarea>
    </div>
    <?php
    if($reserveHistoryCheck && !$writeCheck) {
        ?>
        <div class="input-group mt-3">
            <span class="input-group-text">평점</span>
            <input type="number" class="form-control" name="grade" value="5" max="5" min="1">
        </div>
        <?php
    } else {
        ?>
        <input type="hidden" name="grade" value="">
        <?php
    }
    ?>
    <button class="btn btn-primary mt-3">리뷰 등록</button>
</form>

<?php } ?>

<script>
    $('input[type="number"]').on('change', (e)=> {
        price(e.target.value)
        $('input[name="count"]').val(e.target.value)
    })

    price(1)

    function price(cnt) {
        let price = parseInt($('#price').html())
        <?php
        if(isset($_SESSION['user'])) {
            ?>
            let discount = 0
            <?php
             if($_SESSION['user']->level == '브론즈') {
                ?>
                discount = 5
                <?php
            } else if($_SESSION['user']->level == '실버') {
                ?>
                discount = 10
                <?php
            } else if($_SESSION['user']->level == '골드') {
                ?>
                discount = 15
                <?php
            } else if($_SESSION['user']->level == 'VIP') {
                ?>
                discount = 20
                <?php
            }
            ?>
            $('input[name="total"]').val(price * cnt * (100-discount) / 100)
            $('#total').html(`${price * cnt * (100-discount) / 100}`)
            <?php
        } else {
            ?>
            $('input[name="total"]').val(price * cnt)
            $('#total').html(`${price * cnt}`)
            <?php
        }
        ?>
    }

</script>

<style>
    img {
        width: 150px;
        height: 150px;
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