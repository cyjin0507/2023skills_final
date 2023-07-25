<?php

$total = row("select * from watch");

$list = 10;
$total_page = ceil($total / $list);

$start = ($no - 1) * $list;

$num = $total - $start;

$prev_page = $no == 1 ? 1: $no - 1;
$next_page = $no == $total_page ? $total_page : $no + 1;

?>

<div class="modal fade" id="exc_modal" tabindex="-1" aria-labelledby="exc_modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="exc_modalLabel">Excel Download</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="../include/excel.php" method="post">
        <div class="modal-body">
            <label for="st_date">시작날짜</label>
            <input type="date" name="st_date" id="st_date" class="form-control">
            <label for="en_date">종료날짜</label>
            <input type="date" name="en_date" id="en_date" class="form-control">
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn3">다운로드</button>
        </div>
      </form>
    </div>
  </div>
</div>

<section class="info">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>관람정보</h2>
                <div class="d-flex justify-content-end">
                    <p><?php echo $no; ?></p>
                    <p>/</p>
                    <p><?php echo $total_page; ?></p>
                    <?php
                        if($names == ""){
                    ?>
                        <button class="btn btn3 ms-3 exc_btn_del">엑셀다운로드</button>
                    <?php } else { ?>
                        <button class="btn btn3 ms-3 exc_btn">엑셀다운로드</button>
                    <?php } ?>
                </div>
                <table class="table mt-3 info_table">
                    <thead>
                        <tr>
                            <td>관람 이미지</td>
                            <td>관람 제목</td>
                            <td>관람 내용</td>
                            <td>관람 날짜</td>
                            <td>관람 주소</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            foreach(sql("select * from watch order by idx desc limit {$start}, {$list}")as $rs){
                        ?>
                            <tr data-idx="<?php echo $rs->idx; ?>">
                                <td><img src="/image/<?php echo $rs->img; ?>" alt=""></td>
                                <td><?php echo $rs->tit; ?></td>
                                <td><?php echo $rs->con; ?></td>
                                <td><?php echo $rs->date; ?></td>
                                <td><?php echo $rs->loc;?></td>
                            </tr>
                        <?php
                            }
                        ?>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    <a href="/info/<?php echo $prev_page ?>" class="btn btn4 mx-1"><</a>
                    <?php
                        for($i=1; $i<=$total_page; $i++){
                    ?>
                            <a href="/info/<?php echo $i; ?>" class="btn btn4 mx-1"><?php echo $i; ?></a>
                    <?php
                        }
                    ?>
                    <a href="/info/<?php echo $next_page ?>" class="btn btn4 mx-1">></a>
                </div>
            </div>
        </div>
    </div>
</section>