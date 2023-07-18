<h1>시간별 상영일정</h1>

<?php foreach ($result as $item): ?>
    <div class="card">
        <div class="card-body">
            <p>상영시간 :
                <?= $item->date ?>
            </p>
            <p>출품자 이름 :
                <?= $item->name ?>
            </p>
            <p>영화제목 :
                <?= $item->movie ?>
            </p>
            <p>런닝타임 :
                <?= $item->time ?>
            </p>
            <p>제작년도 :
                <?= $item->year ?>
            </p>
            <p>분류 :<?= $item->type == 0 ? '극영화' :( $item->type == 1 ? '다큐멘터리영화' :( $item->type == 2 ? '애니메이션' : '기타')) ?>
            </p>
        </div>
    </div>
<?php endforeach; ?>