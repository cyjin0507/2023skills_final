<h3 class="mt-5">마이페이지 (투어관리자)</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/0">셔틀버스등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="/mypage/tourlist/1">좌석등록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/2">좌석목록</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/mypage/tourlist/3">예약목록</a>
  </li>
</ul>

<section class="mt-5">
  <h5>좌석등록</h5>
  <ul class="nav nav-pills mt-3">
    <?php
    foreach ($busList as $key => $value) {
    ?>
      <li class="nav-item">
        <div class="nav-link bus-tab" data-idx="<?= $busList[$key]->idx ?>"><?= $busList[$key]->type ?>(<?= $busList[$key]->number ?>)</div>
      </li>
    <?php
    }
    ?>

  </ul>

  <div id="seat-list" class="mt-5">

  </div>
  <button class="btn btn-primary mt-3 reserv-btn">예약 불가</button>

</section>


<script>
  window.onload = async () => {
    let jsonData = await $.getJSON('/bus/info/get')

    let updateList = {}
    let findData = []
    $('.reserv-btn').click(async () => {
      updateList = {}
      document.querySelectorAll('.seat').forEach(x => {
        updateList[x.dataset.seat] = x.checked
      })

      const response = await $.ajax({
        url: '/seat/update',
        method: 'POST',
        data: JSON.stringify({
          'idx': findData.idx,
          'data': JSON.stringify(updateList)
        })
      })

      jsonData = await $.getJSON('/bus/info/get')

    })

    $('.bus-tab').click((e) => {
      findData = []
      let idx = e.target.dataset.idx
      $('.bus-tab').removeClass('active')
      $(e.target).addClass('active')

      findData = jsonData.find(x => x.idx == idx)

      let seatList = JSON.parse(findData.seat)
      drawSeatList(seatList)
    })

    function drawSeatList(list) {
      $('#seat-list').html('')

      let key = Object.keys(list)
      let value = Object.values(list)
      key.forEach((x, i) => {
        $('#seat-list').append(`
        <div>
          <span>${x}</span>
          <input type="checkbox" data-seat="${x}" class="seat" ${value[i] ? 'checked' : ''}>
        </div>
      `)
      })
    }

  }
</script>

<style>
  #seat-list {
    width: 300px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>