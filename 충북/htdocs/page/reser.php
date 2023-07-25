
<?php
    if($names == ""){
        alert("로그인을 먼저 진행해 주세요");
        back();
    }

    if($no != 1){
        $rs = fetch("select * from watch where idx ='$no'");
?>
        <div class="modal fade show" id="reservation" tabindex="-1" aria-labelledby="reservation" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="reservationlabel">reservation modal</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="/reser_ok" method="post">
                        <div class="modal-body">
                            <input type="hidden" name="res_idx" value="<?php echo $rs->idx; ?>">
                            <label for="res_tit">관람 제목</label>
                            <input type="text" name="res_tit" id="res_tit" class="form-control mb-3" readonly value="<?php echo $rs->tit; ?>">
                            <label for="res_con">관람 내용</label>
                            <textarea name="res_con" id="res_con" cols="30" rows="5" class="form-control mb-3" readonly><?php echo $rs->con; ?></textarea>
                            <label for="res_add">관람 주소</label>
                            <input type="text" name="res_add" id="res_add" class="form-control mb-3" readonly value="<?php echo $rs->loc; ?>">
                            <label for="res_dat">관람 날짜</label>
                            <input type="date" name="res_dat" id="res_dat" class="form-control mb-3" readonly value="<?php echo $rs->date; ?>">
                            <label for="res_date">날짜를 선택하세요</label>
                            <input type="date" name="res_date" id="res_date" class="form-control">
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn3">예약하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
<?php } ?>

<script>
    window.onload = function() {
      $('#reservation').modal('show');
    };
</script>

<section class="reser">
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>예약 내역</h2>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <td>예약날짜</td>
                            <td>관람제목</td>
                            <td>관람주소</td>
                            <td>예약상태</td>
                            <td>예약취소</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            foreach(sql("select * from reser where id = '$ids' order by idx desc") as $rs ){
                                if($rs->sta == "chk_w"){
                                    $sta = "예약 확인 중";
                                } else if($rs->sta == "chk_ok"){
                                    $sta = "수락한 예약";
                                } else if($rs->sta == "chk_del"){
                                    $sta = "거절한 예약";
                                }
                                $rs2 = fetch("select * from watch where idx = '$rs->r_idx'");
                        ?>
                            <tr>
                                <td><?php echo $rs->date; ?></td>
                                <td><?php echo $rs2->tit; ?></td>
                                <td><?php echo $rs2->loc; ?></td>
                                <td><?php echo $sta; ?></td>
                                <td>
                                    <?php if($rs->sta == "chk_w"){ ?>
                                    <a href="/reser_del/<?php echo $rs->idx; ?>" class="btn btn3">예약취소</a>
                                    <?php } ?>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>