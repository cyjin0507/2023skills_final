<h3 class="mt-5">장바구니 페이지</h3>

<table class="table mt-3">
    <thead>
        <tr>
            <th>썸네일</th>
            <th>제품명</th>
            <th>단가</th>
            <th>구입 수량</th>
            <th>구입 금액</th>
            <th>재고 수량</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<h3 class="mt-5">정보입력</h3>
<div class="input-group mt-3">
    <span class="input-group-text">이름</span>
    <input type="text" class="form-control" id="name">
</div>
<div class="input-group mt-3">
    <span class="input-group-text">휴대폰 번호</span>
    <input type="text" class="form-control" id="phone">
</div>
<div class="input-group mt-3">
    <span class="input-group-text">주소</span>
    <input type="text" class="form-control" id="addr">
</div>
<div class="input-group mt-3">
    <span class="input-group-text">배송 시 요청사항</span>
    <textarea class="form-control" id="request" cols="30" rows="10"></textarea>
</div>
<button class="btn btn-primary mt-3" id="order-btn">주문하기</button>
<button class="btn btn-danger mt-3" id="reset-btn">장바구니 비우기</button>


<script src="/js/Basket.js"></script>

<style>
    thead {
        background-color: #333;
        color: white;
    }

    tr, th {
        text-align: center;
    }

    table img {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
</style>