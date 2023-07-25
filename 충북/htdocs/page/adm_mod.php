<?php

$rs = fetch("select * from watch where idx = '$no'");

?>

<section class="mod">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>관람일정수정</h2>
            </div>
            <div class="col-12">
                <form action="/adm_mod_ok/<?php echo $no; ?>" method="post" enctype="multipart/form-data" class="form mt-4">
                    <div class="row">
                        <div class="col-7">
                            <label for="adm_tit">제목을 입력하세요</label>
                            <input type="text" name="adm_tit" id="adm_tit" class="form-control mb-3" value="<?php echo $rs->tit?>">
                        </div>
                        <div class="col-7">
                            <label for="adm_con">내용을 입력하세요</label>
                            <textarea name="adm_con" id="adm_con" cols="30" rows="5" class="form-control mb-3"><?php echo $rs->con; ?></textarea>
                        </div>
                        <div class="col-7">
                            <label for="adm_date">날짜를 입력하세요</label>
                            <input type="date" name="adm_date" id="adm_date" class="form-control mb-3" value="<?php echo $rs->date; ?>">
                        </div>
                        <div class="col-7">
                            <label for="adm_loc">장소를 입력하세요</label>
                            <input type="text" name="adm_loc" id="adm_loc" class="form-control mb-3" value="<?php echo $rs->loc; ?>">
                        </div>
                        <div class="col-7">
                            <label for="adm_file">파일을 업로드 하세요 <span class="option">(선택)</span> </label>
                            <input type="file" name="adm_file" id="adm_file" class="form-control mb-3" value="<?php echo $rs->file; ?>">
                        </div>
                    </div>
                    <button type="submit" class="btn btn1 mt-4">수정</button>
                </form>
            </div>
        </div>
    </div>
</section>