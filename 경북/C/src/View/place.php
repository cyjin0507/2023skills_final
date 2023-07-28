<div id="place">
    <h3 class="mt-5">최근 리뷰</h3>
    <table class="mt-3 table" id="review-table">
        <thead>
            <tr>
                <th>명소 이름</th>
                <th>방문날짜</th>
                <th>별점</th>
                <th>리뷰내용</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

    <h3 class="mt-5">명소 목록</h3>
    <table class="mt-3 table" id="place-table">
        <thead>
            <tr>
                <th>사진</th>
                <th>제목</th>
                <th>별점</th>
                <th>리뷰 수</th>
                <th>거리 데이터</th>
                <th>리뷰 작성 버튼</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>

<div id="review">
    <h3 class="mt-5">리뷰 작성</h3>
    <form class="mt-4">
        <div class="input-group">
            <span class="input-group-text">이름</span>
            <input type="text" class="form-control" id="review-name" readonly>
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">방문날짜</span>
            <input type="date" class="form-control" id="review-date">
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">별점</span>
            <input type="number" class="form-control" id="review-score">
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">리뷰내용</span>
            <textarea class="form-control" id="review-content" placeholder="다른 방문자들을 위한 리뷰를 남겨주세요" id="review-name" style="resize: none;" cols="30" rows="10"></textarea>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="review-write-btn">작성</button>
    </form>
</div>


<script src="/js/Place.js"></script>

<style>

        table img {
            width: 70px;
            height: 70px;
        }

        thead {
            background-color: #333;
            color: white;
        }

        td, th {
            text-align: center;
        }

        #review {
            display: none;
        }

    </style>