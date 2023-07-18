<h1>게임 관리 페이지</h1>


    <div class="d-flex-b">
        <select name="order" id="order">
            <option value="dateAsc">날짜 오름차순</option>
            <option value="dateDesc" selected>날짜 내림차순</option>
            <option value="scoreASC">점수 오름차순</option>
            <option value="scoreDesc">점수 내림차순</option>
        </select>
        <div>
            <input type="text" name="search" id="search" placeholder="검색창">
            <button class="btn btn-primary search-btn" >검색</button>            
        </div>
    </div>

<table class="table">
    <tbody class="manage-table">
        <tr>
            <th>데이터 번호</th>
            <th>게임 이름</th>
            <th>사용자 이름</th>
            <th>게임 결과</th>
            <th>데이터 삽입 날짜</th>
            <th>삭제 버튼</th>
        </tr>
    </tbody>
</table>

<script src="./resources/js/manage.js"></script>