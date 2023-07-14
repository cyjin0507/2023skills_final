<h3 class="mt-5">예약목록</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>예약 일자</th>
            <th>예약자 아이디</th>
            <th>예약자성명</th>
            <th>전화번호</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$list[$key]->start?> ~ <?=$list[$key]->end?></td>
                <td><?=$list[$key]->id?></td>
                <td><?=$list[$key]->name?></td>
                <td><?=$list[$key]->tel?></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>


<style>
    th, td {
        text-align: center;
    }

    thead {
        background-color: #333;
        color: white;
    }

</style>