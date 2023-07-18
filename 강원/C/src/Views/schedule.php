<section id="schedule">
    <div class="schedule-wrap container">
        <h1>상영일정</h1>

        <div class="schedule-title d-flex-c">
            <div class="angle">
                <?php if ($month == 1): ?>
                    <a href="/schedule?year=<?= $year - 1 ?>&month=12">
                        <i class="fa fa-angle-left"></i>
                    </a>
                <?php else: ?>
                    <a href="/schedule?year=<?= $year ?>&month=<?= $month - 1 ?>">
                        <i class="fa fa-angle-left"></i>
                    </a>
                <?php endif; ?>
            </div>
            <h2>
                <?= $year ?>.
                <?= $month ?>
            </h2>
            <div class="angle">
                <?php if ($month == 12): ?>
                    <a href="/schedule?year=<?= $year + 1 ?>&month=1">
                        <i class="fa fa-angle-right"></i>
                    </a>
                <?php else: ?>
                    <a href="/schedule?year=<?= $year ?>&month=<?= $month + 1 ?>">
                        <i class="fa fa-angle-right"></i>
                    </a>
                <?php endif; ?>

            </div>
        </div>
        <?php if (isset($_SESSION['user']) && $_SESSION['user']['id'] == "admin"): ?>
            <a href="/manage" class="btn btn-primary">상영일정등록</a>
        <?php endif; ?>
        <table>
            <thead>
                <tr>
                    <th>일</th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($day = 1, $nextDay = 1, $isDay = 0, $i = 0; $i < $total_week; $i++): ?>
                    <tr>
                        <?php for ($week = 0; $week < 7; $week++): ?>
                            <td onclick="window.location.href=`/detail?y=<?=$year?>&m=<?=$month?>&d=<?=$day?>`">
                                <?php if (($day > 1 || $week >= $start_week) && ($total_day >= $day)): ?>
                                    <div class="s-date">
                                        <?= $day++ ?>
                                    </div>
                                    <?php foreach ($c as $item):
                                        $itemDate = strtotime($item->date);
                                        $Dmonth = date('m', $itemDate);
                                        $Dyear = date('Y', $itemDate);
                                        $Dday = date('d', $itemDate);
                                        $isDay = $day;
                                        $isDay--;
                                        if ($Dmonth == $month && $Dyear == $year && $Dday == $isDay--):
                                            ?>
                                            <div class="cal">
                                                <p>
                                                    <?= $item->title ?>
                                                </p>
                                        </div>
                                    <?php endif; endforeach; elseif ($total_day <= $day): ?>
                                    <div class="s-date opacity-3">
                                        <?= $nextDay++ ?>
                                    </div>
                                <?php elseif ($week <= $start_week): ?>
                                    <div class="s-date opacity-3">
                                        <?= $prev_day++ ?>
                                    </div>
                                <?php endif; ?>
                            </td>
                        <?php endfor; ?>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
    </div>
</section>