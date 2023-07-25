<?php
$type = substr($cidx, 0,1);
$num = substr($cidx, (strlen($cidx) - 1) * -1,strlen($cidx) - 1);
$name = $type == "a" ? "숲속의 집" : "오토캠핑장";

$endDate = date("Y-m-d", strtotime("+". $term ."day", strtotime($reservDate)));

$termType = $term==1 ? '1박2일' : ($term==2 ? '2박3일' : '3박4일');


$price = 0;
$nextDate = $reservDate;
for($i=0; $i<$term; $i++) {
    $nextDate = date("Y-m-d", strtotime("+1day", strtotime($nextDate)));
    $dayNum = date('w', strtotime($nextDate));
    if($dayNum == 0 || $dayNum == 6) {
        $price += 13000;
    } else {
        $price += 10000;
    }
}


?>

<h3 class="mt-5">위례산 자연휴양림</h3>

<h4 class="mt-5"><?=$name?></h4>
<button class="mt-3 btn btn-primary">시설명 : <?=$num?>호</button>
<button class="mt-3 btn btn-primary">숙박기간 : <?=$reservDate?> ~ <?=$endDate?> (<?=$termType?>)</button>
<button class="mt-3 btn btn-primary">이용금액 : <?=$price?>원</button>

<form action="/reserv/process" method="POST" class="mt-5">
    <input type="hidden" value="<?=$cidx?>" name="cidx">
    <input type="hidden" value="<?=$term?>" name="term">
    <input type="hidden" value="<?=$reservDate?>" name="reservDate">

    <div class="input-group mt-3" style="width: 300px;">
        <span class="input-group-text">예약인원</span>
        <input type="number" class="form-control" name="people" max="6" min="0">
    </div>
    <div class="input-group mt-3" style="width: 300px;">
        <span class="input-group-text">연락처</span>
        <input type="text" class="form-control" name="phone">
    </div>
    <div class="input-group mt-3" style="width: 300px;">
        <span class="input-group-text">신청인</span>
        <input type="text" class="form-control" name="applicant">
    </div>
    <div class="input-group mt-3" style="width: 300px;">
        <span class="input-group-text">차량번호</span>
        <input type="text" class="form-control" name="car">
    </div>

    <a href="/reserve.php" class="btn btn-warning mt-3">재작성</a>
    <button type="submit" class="btn btn-primary mt-3">완료</button>
</form>