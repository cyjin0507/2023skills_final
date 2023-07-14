<h3 class="mt-5">숙박업소 리뷰</h3>
<table class="mt-3 table">
    <thead>
        <tr>
            <th>번호</th>
            <th>리뷰작성자이름</th>
            <th>사용한 객실</th>
            <th>리뷰 내용</th>
            <th>작성날짜</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$key+1?></td>
                <td><?=$list[$key]->user?></td>
                <td><a href="/review/detail/<?=$list[$key]->idx?>"><?=$list[$key]->name?></a></td>
                <td><?=$list[$key]->content?></td>
                <td><?=$list[$key]->create_date?></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>


<style>
    td, th {
        text-align: center;
    }

    thead {
        background-color: #333;
        color: white;
    }
</style>