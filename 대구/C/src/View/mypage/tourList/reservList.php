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
      foreach($busList as $key=>$value) {
        ?>
        <tr>
          <td><?=$busList[$key]->number?></td>
          <td><?=$busList[$key]->begin?></td>
          <td><?=$busList[$key]->date==null ? '' : $busList[$key]->date . ' ' . $busList[$key]->time?></td>
          <td><?=$busList[$key]->accept==1 ? '승인 중' : '승인 완료'?></td>
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

  th, td {
    text-align: center;
  }

</style>