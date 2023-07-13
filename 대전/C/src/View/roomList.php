<h3 class="mt-5">객실목록</h3>
<table class="mt-3 table">
    <thead>
        <tr>
            <th>객실 이름</th>
            <th>객실 이용요금</th>
            <th>등록일</th>
            <th>객실 삭제 버튼</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$list[$key]->name?></td>
                <td><?=$list[$key]->price?></td>
                <td><?=$list[$key]->create_date?></td>
                <td><a href="/room/delete/<?=$list[$key]->idx?>" class="btn btn-danger">객실 삭제</a></td>
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

    td, th {
        text-align: center;
    }
</style>