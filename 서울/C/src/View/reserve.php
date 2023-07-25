<div id="calender-area">
    <table class="calendar table mt-5 table-bordered">
        <thead>
            <tr>
                <td id="before">&#60;</td>
                <td colspan="5">
                    <span id="calYear"></span>년
                    <span id="calMonth"></span>월
                </td>
                <td id="after">&#62;</td>
            </tr>
            <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
            </tr>
        </thead>
        <tbody>
        </tbody>

    </table>
    <div id="reserv-modal">
        <div>
            <div>
                <div>
                    <span>사용시작일</span>
                    <div id="reserv-date">2023년 8월 18일</div>
                    <input type="hidden" id="reserv-data-val">
                </div>
                <div>
                    <span>시설이름</span>
                    <select id="cidx" class="form-control" style="width: 200px;">
                        <option value="a1">숲속의 집 1호</option>
                        <option value="a2">숲속의 집 2호</option>
                        <option value="a3">숲속의 집 3호</option>
                        <option value="a4">숲속의 집 4호</option>
                        <option value="a5">숲속의 집 5호</option>
                        <option value="a6">숲속의 집 6호</option>
                        <option value="a7">숲속의 집 7호</option>
                        <option value="a8">숲속의 집 8호</option>
                        <option value="a9">숲속의 집 9호</option>
                        <option value="a10">숲속의 집 10호</option>
                        <option value="a11">숲속의 집 11호</option>
                        <option value="a12">숲속의 집 12호</option>
                        <option value="a13">숲속의 집 13호</option>
                        <option value="a14">숲속의 집 14호</option>
                        <option value="a15">숲속의 집 15호</option>
                        <option value="a16">숲속의 집 16호</option>
                        <option value="b1">오토캠핑장 1호</option>
                        <option value="b2">오토캠핑장 2호</option>
                        <option value="b3">오토캠핑장 3호</option>
                        <option value="b4">오토캠핑장 4호</option>
                        <option value="b5">오토캠핑장 5호</option>
                        <option value="b6">오토캠핑장 6호</option>
                        <option value="b7">오토캠핑장 7호</option>
                        <option value="b8">오토캠핑장 8호</option>
                        <option value="b9">오토캠핑장 9호</option>
                        <option value="b10">오토캠핑장 10호</option>
                        <option value="b11">오토캠핑장 11호</option>
                        <option value="b12">오토캠핑장 12호</option>
                        <option value="b13">오토캠핑장 13호</option>
                        <option value="b14">오토캠핑장 14호</option>
                        <option value="b15">오토캠핑장 15호</option>
                        <option value="b16">오토캠핑장 16호</option>
                    </select>
                </div>
                <div>
                    <span>예약기간</span>
                    <select id="term" class="form-control" style="width: 200px;">
                        <option value="1">1박2일</option>
                        <option value="2">2박3일</option>
                        <option value="3">3박4일</option>
                    </select>
                </div>
            </div>
            <button class="btn btn-warning" id="reserv-btn">예약하기</button>
        </div>
    </div>
</div>


<!-- 빨간색 : 숲속의 집 / 파란색 : 오토캠핑장 -->
<div id="location-modal">
    <div>
        <div class="location" id="typeA">
            <div data-idx="a1">1</div>
            <div data-idx="a2">2</div>
            <div data-idx="a3">3</div>
            <div data-idx="a4">4</div>
            <div data-idx="a5">5</div>
            <div data-idx="a6">6</div>
            <div data-idx="a7">7</div>
            <div data-idx="a8">8</div>
            <div data-idx="a9">9</div>
            <div data-idx="a10">10</div>
            <div data-idx="a11">11</div>
            <div data-idx="a12">12</div>
            <div data-idx="a13">13</div>
            <div data-idx="a14">14</div>
            <div data-idx="a15">15</div>
            <div data-idx="a16">16</div>
        </div>
        <div class="location" id="typeB">
            <div data-idx="b1">1</div>
            <div data-idx="b2">2</div>
            <div data-idx="b3">3</div>
            <div data-idx="b4">4</div>
            <div data-idx="b5">5</div>
            <div data-idx="b6">6</div>
            <div data-idx="b7">7</div>
            <div data-idx="b8">8</div>
            <div data-idx="b9">9</div>
            <div data-idx="b10">10</div>
            <div data-idx="b11">11</div>
            <div data-idx="b12">12</div>
            <div data-idx="b13">13</div>
            <div data-idx="b14">14</div>
            <div data-idx="b15">15</div>
            <div data-idx="b16">16</div>
        </div>
    </div>
</div>

</div>


<style>
    #location-modal {
        position: absolute;
        top: 0;
        right: 0;
        width: 360px;
        display: none;
    }

    #location-modal > div {
        display: flex;
    }

    .location {
        width: 180px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .location:nth-child(1) {
        border: 1px solid red;
    }

    .location:nth-child(2) {
        border: 1px solid blue;
    }

    .location>div {
        height: 45px;
        border: 1px solid #aaa;
        background-color: white;
    }

    table {
        text-align: center;
        margin: 0;
    }

    .calendar tbody td {
        height: 100px;
        transition: all .3s;
    }

    #calender-area {
        position: relative;
    }

    #reserv-modal {
        background-color: white;
        position: absolute;
        width: calc(100% / 7 * 3);
        height: 250px;
        display: none;
        border: 1px solid skyblue;
        padding: 10px 50px;
    }

    #reserv-modal>div {
        display: flex;
    }

    #reserv-modal>div>div>div {
        display: flex;
        margin-top: 20px;
    }

    #reserv-modal>div>div>div>span {
        width: 120px;
        display: flex;
        align-items: center;
    }

    #reserv-modal button {
        margin-left: 40px;
        margin-top: 120px;
        height: 40px;
    }
</style>

<script src="/script/Location.js"></script>
<script src="/script/Reservation.js"></script>
<script src="/script/Calender.js"></script>