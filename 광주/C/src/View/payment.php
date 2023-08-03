<h3 class="mt-5">상품 결제 페이지</h3>
<div class="mt-5">
    <div>
        <small>상품명 : </small>
        <big><?=$data->product?></big>
    </div>
    <div class="mt-3">
        <small>상품수량 : </small>
        <big id="price"><?=$count?></big>
    </div>
    <div class="mt-3">
        <small>상품 이미지 : </small>
        <img src="/img/<?=$data->img?>.jpg" alt="">
    </div>
    <div class="mt-3">
        <small>상품금액 : </small>
        <big><?=$total?></big>
    </div>
</div>

<form action="/payment/process" method="POST" class="mt-5">
    <input type="hidden" name="idx" value="<?=$data->idx?>">
    <input type="hidden" name="product" value="<?=$data->product?>">
    <input type="hidden" name="quantity" value="<?=$count?>">
    <input type="hidden" name="price" value="<?=$total?>">
    <textarea name="address" class="form-control" style="width: 400px;" placeholder="배송지를 입력해주세요."></textarea>
    <button class="btn btn-primary mt-3">결제하기</button>
</form>



<style>
    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }
</style>