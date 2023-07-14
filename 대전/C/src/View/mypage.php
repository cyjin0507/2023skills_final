<h3 class="mt-5">예약내역</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>순번</th>
            <th>예약날짜</th>
            <th>숙박업소이름</th>
            <th>숙박업소객실명</th>
            <th>가격</th>
            <th>예약신청일</th>
            <th>상태 정보</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$key+1?></td>
                <td><?=$list[$key]->start?> ~ <?=$list[$key]->end?></td>
                <td><?=$list[$key]->acco?></td>
                <td><?=$list[$key]->name?></td>
                <td><?=$list[$key]->price?></td>
                <td><?=$list[$key]->create_date?></td>
                <td>
                    <?php
                    if($list[$key]->end < date('Y-m-d', time())) {
                        ?>
                        <button class="btn btn-primary review-btn" data-room="<?=$list[$key]->ridx?>" data-reserv="<?=$list[$key]->idx?>">리뷰</button>
                        <?php
                    } else if(intval((strtotime(date("Y-m-d",time()))-strtotime($list[$key]->start)) / 86400) <= -7) {
                        ?>
                        <a href="/reservation/cancel/<?=$list[$key]->idx?>" class="btn btn-danger">취소</a>
                        <?php
                    } else {
                        echo "-";
                    }
                    ?>
                </td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<nav aria-label="Page navigation" class="mt-3">
  <ul class="pagination">
    <?php
    for($i=0; $i<count($reserv) / 5; $i++) {
        ?>
        <li class="page-item <?=$page==$i+1 ? 'active' : ''?>"><a class="page-link" href="/mypage/<?=$i+1?>"><?=$i+1?></a></li>
        <?php
    }
    ?>
  </ul>
</nav>


<h3 class="mt-5">회원정보</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>전화번호수정버튼</th>
            <th>회원등급</th>
            <th>마일리지점수</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><?=$user->name?></th>
            <th><?=$user->tel?></th>
            <th><button class="btn btn-primary phone-btn">젼화번호수정버튼</button></th>
            <th><?=$user->grade?></th>
            <th><?=$user->score?></th>
        </tr>
    </tbody>
</table>


<div class="modal" id="review-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form action="/review/add/process" method="post" enctype="multipart/form-data">
        <input type="hidden" name="roomIdx" id="roomIdx">
        <input type="hidden" name="reservIdx" id="reservIdx">
        <div class="modal-header">
            <h5 class="modal-title">리뷰작성</h5>
        </div>
        <div class="modal-body">
            <div class="input-group">
                <span class="input-group-text">평점</span>
                <input type="number" min="1" max="5" value="5" class="form-control" name="grade">
            </div>
            <div class="input-group mt-3">
                <span class="input-group-text">리뷰내용</span>
                <textarea name="content" class="form-control"></textarea>
            </div>
            <div class="input-group mt-3">
                <span class="input-group-text">사진</span>
                <input type="file" name="file" class="form-control">
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">작성</button>
            <button type="button" class="btn btn-secondary close">닫기</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="modal" id="phone-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form action="/user/info/modify" method="post" enctype="multipart/form-data">
        <div class="modal-header">
            <h5 class="modal-title">전화번호 수정</h5>
        </div>
        <div class="modal-body">
            <div class="input-group">
                <span class="input-group-text">전화번호</span>
                <input type="text" name="tel" class="form-control">
            </div>
            <div class="input-group mt-3">
                <span class="input-group-text">비밀번호</span>
                <input type="password" name="pw" class="form-control">
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">작성</button>
            <button type="button" class="btn btn-secondary close">닫기</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
    $('.review-btn').click((e)=> {
        $('#roomIdx').val(e.target.dataset.room)
        $('#reservIdx').val(e.target.dataset.reserv)
        $('#review-modal').fadeIn()
    })

    $('.close').click((e)=> {
        $('.modal').fadeOut()
    })

    $('.phone-btn').click(()=> {
        $('#phone-modal').fadeIn()
    })

</script>


<style>
    thead {
        background-color: #333;
        color: white;
    }

    td, th {
        text-align: center;
    }
</style>