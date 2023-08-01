<h3 class="mt-5">마이페이지 (투어관리자)</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link active" href="/mypage/tourlist/0">셔틀버스등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/1">좌석등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/2">좌석목록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/3">예약목록</a>
  </li>
</ul>


<section id="tab1" class="mt-5">
    <h5>셔틀버스등록</h5>

    <form action="/bus/register" method="POST" class="mt-3" enctype="multipart/form-data">
        <div class="input-group mt-3">
            <span class="input-group-text">차량의 종류</span>
            <select name="type" class="form-control">
                <option value="승용차">승용차</option>
                <option value="SUV">SUV</option>
                <option value="승합차">승합차</option>
                <option value="버스">버스</option>
            </select>
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">출발지</span>
            <select name="start" class="form-control">
                <option value="천안역">천안역</option>
                <option value="유관순사적지">유관순사적지</option>
                <option value="독립기념관">독립기념관</option>
            </select>
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">경유지</span>
            <select name="middle" class="form-control">
                <option value="천안역">천안역</option>
                <option value="유관순사적지" selected>유관순사적지</option>
                <option value="독립기념관">독립기념관</option>
            </select>
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">도착지</span>
            <select name="end" class="form-control">
                <option value="천안역">천안역</option>
                <option value="유관순사적지">유관순사적지</option>
                <option value="독립기념관" selected>독립기념관</option>
            </select>
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">차량 대표사진</span>
            <input type="file" name="file" class="form-control">
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">차량번호</span>
            <input type="number" name="number" class="form-control">
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">출발위치</span>
            <select name="begin" class="form-control">
                <option value="천안역">천안역</option>
                <option value="유관순사적지">유관순사적지</option>
                <option value="독립기념관" selected>독립기념관</option>
            </select>
        </div>
        <button class="btn btn-primary mt-3">등록</button>
    </form>

</section>