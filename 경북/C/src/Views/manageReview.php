<h1>리뷰 관리 페이지</h1>


<div class="d-flex-b">
    <select name="order" id="order">
        <option value="dateAsc">날짜 오름차순</option>
        <option value="dateDesc" selected>날짜 내림차순</option>
        <option value="scoreASC">점수 오름차순</option>
        <option value="scoreDesc">점수 내림차순</option>
    </select>
    <div>
        <input type="text" name="search" id="search" placeholder="검색창">
        <button class="btn btn-primary search-btn">검색</button>
    </div>
</div>

<form action="/update" method="post">
    <table class="table">
        <tbody class="manage-table">
            
            <tr>
                <th>데이터 번호</th>
                <th>천안의 명소 제목</th>
                <th>방문 날짜</th>
                <th>평점</th>
                <th>내용</th>
                <th>명소 데이터 번호</th>
                <!-- 명소 데이터 번호: (모든 데이터 출력이여서 혹시 몰라서 씀)  -->
                <th>수정 버튼</th>
                <th>삭제 버튼</th>
            </tr>
        </tbody>
    </table>
</form>
<script src="./resources/js/manage.js"></script>