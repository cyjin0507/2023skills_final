<h3 class="mt-5">마이페이지 (투어관리자)</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/0">셔틀버스등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/1">좌석등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/2">좌석목록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="/mypage/tourlist/3">예약목록</a>
  </li>
</ul>

<section class="mt-5">
  <h5>관리자 승인영역</h5>
  <table class="mt-3 table">
    <thead>
      <tr>
        <th>차량번호</th>
        <th>출발위치</th>
        <th>배차날짜및시간</th>
        <th>승인상태</th>
      </tr>
    </thead>
    <tbody>
      <?php
      foreach ($busList as $key => $value) {
      ?>
        <tr>
          <td><?= $busList[$key]->number ?></td>
          <td><?= $busList[$key]->begin ?></td>
          <td><?= $busList[$key]->date == null ? '' : $busList[$key]->date . ' ' . $busList[$key]->time ?></td>
          <td><?= $busList[$key]->accept == 1 ? '승인 중' : '승인 완료' ?></td>
        </tr>
      <?php
      }
      ?>
    </tbody>
  </table>
</section>

<section class="mt-5">
  <h5>사용자 예약영역</h5>
  <table class="table mt-3">
    <thead>
      <tr>
        <th>차량번호</th>
        <th>신청 좌석</th>
        <th>아이디</th>
        <th>이름</th>
        <th>구분</th>
        <th>전화번호</th>
        <th>총 결제금액</th>
        <th>승인/불가 버튼</th>
      </tr>
    </thead>
    <tbody>
      <?php
      foreach($reservList as $key=>$value) {
        ?>
        <tr>
          <td><?=$reservList[$key]->number?></td>
          <td><?=$reservList[$key]->seat?></td>
          <td><?=$reservList[$key]->id?></td>
          <td><?=$reservList[$key]->name?></td>
          <td><?=$reservList[$key]->type?></td>
          <td><?=$reservList[$key]->phone?></td>
          <td><?=$reservList[$key]->price?></td>
          <td>
            <?php
            if($reservList[$key]->accept == 0) {
              ?>
              <a href="/reserv/accept/<?=$reservList[$key]->idx?>/1" class="btn btn-primary">승인</a>
              <a href="/reserv/accept/<?=$reservList[$key]->idx?>/2" class="btn btn-danger">불가</a>
              <?php
            } else if($reservList[$key]->accept == 1) {
              ?>
              <button class="btn btn-primary">승인</button>
              <?php
            }
            ?>
          </td>
        </tr>
        <?php
      }
      ?>
    </tbody>
  </table>
</section>


<style>
  thead {
    background-color: #333;
    color: white;
  }

  th,
  td {
    text-align: center;
  }
</style>