<h3 class="mt-5">관리자</h3>

<button class="btn btn-primary mt-3" id="register-btn">등록 확인</button>
<button class="btn btn-primary mt-3">물품 등록</button>

<div id="goods-list" class="mt-5">
    <h5>특산품 리스트</h5>

    <table class="table mt-3">
        <thead>
            <tr>
                <th>썸네일</th>
                <th>제품명</th>
                <th>단가</th>
                <th>재고 수량</th>
                <th>삭제 버튼</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img src="" alt=""></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>

    </table>

</div>


<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">물품 등록</h5>
            </div>
            <form action="/goods/register" method="post" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="input-group">
                        <span class="input-group-text">썸네일 등록</span>
                        <input type="file" class="form-control" name="file" required>
                    </div>
                    <div class="input-group mt-3">
                        <span class="input-group-text">제품명</span>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="input-group mt-3">
                        <span class="input-group-text">단가</span>
                        <input type="text" class="form-control" name="price" required>
                    </div>
                    <div class="input-group mt-3">
                        <span class="input-group-text">재고 수량 입력</span>
                        <input type="number" class="form-control" name="stock" required>
                    </div>
                    <div class="input-group mt-3">
                        <span class="input-group-text">판매단위</span>
                        <input type="text" class="form-control" name="unit" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">등록하기</button>
                    <button type="button" class="btn btn-secondary cancel">취소하기</button>
                </div>
            </form>
        </div>
    </div>
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
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

</style>

<script src="/js/Admin.js"></script>