<h3 class="mt-5">마이페이지 (투어관리자)</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/0">셔틀버스등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/1">좌석등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="/mypage/tourlist/2">좌석목록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/3">예약목록</a>
  </li>
</ul>

<section class="mt-5">
  <h3>좌석목록</h3>

  <table class="table mt-3">
    <thead>
      <tr>
        <th>차량종류</th>
        <th>투어코스</th>
        <th>차량대표사진</th>
        <th>출발위치</th>
        <th>차량번호</th>
        <th>좌석별 예약구분</th>
        <th>배차승인요청</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</section>

<style>
  thead{ 
    background-color: #333;
    color: white;
  }

  th, td {
  text-align: center;
  }

  table img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }

</style>

<script>
  window.onload = async () => {
    let jsonData = await $.getJSON('/bus/info/get')
    
    $('tbody').html('')
    jsonData.forEach(x=> {
      let seat = JSON.parse(x.seat)
      let key = Object.keys(seat)
      let value = Object.values(seat)
      $('tbody').append(`
        <tr>
          <td>${x.type}</td>
          <td>${x.start} -> ${x.middle} -> ${x.end}</td>
          <td><img src="/upload/${x.image}"></td>
          <td>${x.begin}</td>
          <td>${x.number}</td>
          <td class="seat ${x.idx}">${x.number}</td>
          <td><a href="${x.accept==0? `/bus/accept/${x.idx}` : "#"}" class="btn btn-success">${x.accept==0?"배차승인요청" : (x.accept==1?"요청됨":"수락됨")}</a></td>
        </tr>
      `)

      $(`.seat.${x.idx}`).html('')
      key.forEach((j,i)=> {
        $(`.seat.${x.idx}`).append(`
            ${j} : ${!value[i] ? "예약가능" : "예약불가"} <br>
        `)
      })

    })
    
  }


</script>