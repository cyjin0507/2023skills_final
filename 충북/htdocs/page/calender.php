<?php

$thisyear = date("Y");
$thismonth = date("m");
$today = date("j");

$year = isset($_GET['year']) ? $_GET['year'] : $thisyear;
$month = isset($_GET['month']) ? $_GET['month'] : $thismonth;
$day = isset($_GET['day']) ? $_GET['day'] : $today;

$prev_month = $month - 1;
$next_month = $month + 1;

$prev_year = $next_year = $year;

if($month == 1){
    $prev_year = $year - 1;
    $prev_month = 12;
} else if($month == 12) {
    $next_year = $year + 1;
    $next_month = 1;
}

$maxday = date("t", mktime(0, 0, 0, $month, 1, $year));
$start_week = date("w", mktime(0, 0, 0, $month, 1, $year));

$total_week = ceil(($maxday + $start_week) / 7);
$end_week = date("w", mktime(0, 0, 0, $month, $maxday, $year));

?>

<section class="cal">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>관람 일정</h1>
                <div class="d-flex mt-5 justify-content-center">
                    <a href="/calender?year=<?php echo $prev_year; ?>&month=<?php echo $prev_month; ?>" class="btn btn3">이전달</a>
                    <p class="dat mx-3"><?php echo $year ?>년 <?php echo $month ?>월</p>
                    <a href="/calender?year=<?php echo $next_year; ?>&month=<?php echo $next_month; ?>" class="btn btn3">다음달</a>
                </div>
                <table class="table text-center mt-3">
                    <thead class="thead">
                        <tr>
                            <td>일</td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                            <td>토</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $days = 1;

                            for($i=1; $i<=$total_week; $i++){
                                echo '<tr>';

                                for($k=0; $k<7; $k++){
                                    echo '<td class="position-relative">';

                                    if(!(($i == 1 && $k < $start_week) || ($i == $total_week && $k > $end_week))){
                                        echo $days;
                                        $day = substr('0'.$days, -2);
                                        $months = substr('0'.$month, -2);

                                        echo '<div class="w-100 box position-absolute">';

                                        foreach(sql("select * from watch where date = '$year-$months-$day'")as $rs){
                                            $tit = $rs->tit;
                                            if(strlen($rs->tit) > 6){
                                                $tit = $rs->tit.substr(0, 5).'...';
                                            }

                                            $dayy = floor((strtotime($rs->date) - strtotime(date('Y-m-d'))) / 86400);

                                            if($dayy > 0){
                                                echo '<div class="w-100 d-flex justify-content-center"><div class="spe"></div><a href="/reser/'.$rs->idx.'">'.$tit.'(D-'.$dayy.')</a></div>';
                                            } else if( $dayy == 0){
                                                echo '<div class="w-100 d-flex justify-content-center"><div class="spe"></div><a href="/reser/'.$rs->idx.'">'.$tit.'(D-Day)</a></div>';
                                            }
                                        }

                                        echo '</div>';

                                        $days++;
                                    }

                                    echo '</td>';
                                }

                                echo '</tr>';
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>