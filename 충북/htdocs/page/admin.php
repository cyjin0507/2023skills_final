<?php

if($_SESSION['names'] != "관리자"){
    alert("관리자만 들어올수 있습니다");
    back();
}

?>

<div class="modal fade" id="add_modal" tabindex="-1" aria-labelledby="add_modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="add_modallabel">watch modal</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="/adm_add" method="post" enctype="multipart/form-data">
        <div class="modal-body">
            <label for="adm_tit">제목을 입력하세요</label>
            <input type="text" name="adm_tit" id="adm_tit" class="form-control mb-3">
            <label for="adm_con">내용을 입력하세요</label>
            <textarea name="adm_con" id="adm_con" cols="30" rows="5" class="form-control mb-3"></textarea>
            <label for="adm_date">날짜를 입력하세요</label>
            <input type="date" name="adm_date" id="adm_date" class="form-control mb-3">
            <label for="adm_loc">장소를 입력하세요</label>
            <input type="text" name="adm_loc" id="adm_loc" class="form-control mb-3">
            <label for="adm_img">이미지을 업로드 하세요</label>
            <input type="file" name="adm_img" id="adm_img" class="form-control mb-3">
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn3">관람정보추가</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?php

$total = row("select * from watch ");

$list = 10;
$total_page = ceil($total / $list);

$start = ($no - 1) * $list;

$num = $total - $start;

$prev_page = $no == 1 ? 1 : $no-1;
$next_page = $no == $total_page ? $total_page : $no + 1;

?>

<section class="adm">
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>관람 일정 관리</h2>
                <div class="d-flex justify-content-end">
                    <p><?php echo $no; ?></p>
                    <p>/</p>
                    <p><?php echo $total_page; ?></p>
                    <button class="btn btn3 adm_add ms-3">관람정보추가</button>
                </div>
                <table class="man table mt-3">
                    <thead class="thead">
                        <tr>
                            <td>제목</td>
                            <td>관람 날짜</td>
                            <td>장소</td>
                            <td>수정/삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            foreach(sql("select * from watch order by idx desc limit {$start}, {$list}")as $rs){
                        ?>
                            <tr>
                                <td><?php echo $rs->tit; ?></td>
                                <td><?php echo $rs->date; ?></td>
                                <td><?php echo $rs->loc; ?></td>
                                <td>
                                    <a href="/adm_mod/<?php echo $rs->idx; ?>" class="btn btn3">수정</a>
                                    <a href="/adm_del/<?php echo $rs->idx; ?>" class="btn btn3">삭제</a>
                                </td>
                            </tr>
                        <?php
                            }
                        ?>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    <a href="/admin/<?php echo $prev_page ?>" class="btn btn4 mx-1"><</a>
                    <?php
                        for($i=1; $i<=$total_page; $i++){
                    ?>
                            <a href="/admin/<?php echo $i; ?>" class="btn btn4 mx-1"><?php echo $i; ?></a>
                    <?php
                        }
                    ?>
                    <a href="/admin/<?php echo $next_page ?>" class="btn btn4 mx-1">></a>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col">
                <h2>투어 예약 관리</h2>
                <table class="table mt-3 adm_res">
                    <thead>
                        <tr>
                            <td>관람 정보 제목</td>
                            <td>관람 주소</td>
                            <td>예약 날짜</td>
                            <td>예약 유저 아이디</td>
                            <td>예약상태</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                            foreach(sql("select * from reser where date > curdate() order by idx desc")as $rs){ 
                                $rs2 = fetch("select * from watch where idx = '$rs->r_idx'");
                        ?>
                            <tr>
                                <td><?php echo $rs2->tit ?></td>
                                <td><?php echo $rs2->loc ?></td>
                                <td><?php echo $rs->date ?></td>
                                <td><?php echo $rs->id ?></td>
                                <td>
                                    <?php 
                                        if($rs->sta == "chk_w"){
                                    ?>
                                            <a href="/adm_res_ok/<?php echo $rs->idx; ?>" class="btn btn3">예약 수락</a>
                                            <a href="/adm_res_de/<?php echo $rs->idx; ?>" class="btn btn3">예약 거절</a>
                                    <?php
                                        } else if($rs->sta == "chk_ok"){ 
                                    ?>
                                        수락한 예약
                                    <?php 
                                        } else if($rs->sta == "chk_del"){
                                    ?>
                                        취소된 예약
                                    <?php
                                        }  
                                    ?>
                                </td>
                            </tr>    
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>