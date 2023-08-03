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
    <button class="btn btn-primary">상품결제</button>
</form>

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
</style>