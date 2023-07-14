<h3 class="mt-5">객실리스트</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>객실사진</th>
            <th>객실이름(번호)</th>
            <th>객실소개</th>
            <th>상세보기</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td>
                    <?php
                    foreach(json_decode($list[$key]->images) as $key2=>$value2) {
                        ?>
                        <img src="/resources/upload/<?=json_decode($list[$key]->images)[$key2]?>" alt="">
                        <?php
                    }
                    ?>
                </td>
                <td><?=$list[$key]->name?></td>
                <td><?=$list[$key]->introduce?></td>
                <td><button class="btn btn-primary detail-btn" data-idx="<?=$list[$key]->idx?>">상세보기</button></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">상세보기</h5>
      </div>
        <form action="/room/reservation/process" method="POST">
            <div class="modal-body">
                <input type="hidden" name="idx" id="idx">
                <div class="input-group">
                    <span class="input-group-text">예약시작날짜</span>
                    <input type="date" class="form-control" name="start">
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">예약종료날짜</span>
                    <input type="date" class="form-control" name="end">
                </div>
      
              </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">예약하기</button>
                <button type="button" class="btn btn-secondary close">닫기</button>
            </div>
        </form>
    </div>
  </div>
</div>

<script>
    $('.detail-btn').click((e)=> {
        $('#idx').val(e.target.dataset.idx)
        $('.modal').fadeIn()
    })

    $('.close').click(()=> {
        $('.modal').fadeOut()
    })

</script>

<style>
    th, td {
        text-align: center;
    }

    table img {
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
    }
</style>