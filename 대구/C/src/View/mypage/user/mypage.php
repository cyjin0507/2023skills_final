<h3 class="mt-5">마이페이지(일반회원)</h3>


<h5 class="mt-5">예약목록</h5>
<table class="table mt-3">
    <thead>
        <tr>
            <th>차량종류</th>
            <th>차량번호</th>
            <th>차량대표사진</th>
            <th>출발위치</th>
            <th>출발시간</th>
            <th>투어코스</th>
            <th>예약좌석</th>
            <th>예약상태</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$list[$key]->bus?></td>
                <td><?=$list[$key]->number?></td>
                <td><img src="/upload/<?=$list[$key]->image?>" alt=""></td>
                <td><?=$list[$key]->startLoc?></td>
                <td><?=$list[$key]->reserv_time?></td>
                <td><?=$list[$key]->start?> -> <?=$list[$key]->middle?> -> <?=$list[$key]->end?></td>
                <td><?=$list[$key]->seat?></td>
                <td>
                    <?php
                    if($list[$key]->accept == 0) {
                        echo "승인대기";
                    } else if($list[$key]->accept == 1) {
                        echo "승인";
                    } else if($list[$key]->accept == 2) {
                        echo "불가";
                    }
                    ?>
                </td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>


<style>
    thead {
        background-color: #333;
        color: white;
    }

    th, td {
        text-align: center;
    }

    table img {
        width: 70px;
        height: 70px;
        object-fit: cover;
    }

</style>