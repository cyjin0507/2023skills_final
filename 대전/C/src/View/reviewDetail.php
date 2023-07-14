<h3 class="mt-5">리뷰상세보기</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>제목</th>
            <th>사용한 숙박업소</th>
            <th>객실</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>글내용</th>
            <th>삭제버튼</th>
            <th>목록버튼</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>제목은 뭐로 지어야할까</td>
            <td><?= $list->acco ?></td>
            <td><?= $list->room ?></td>
            <td><?= $list->user ?></td>
            <td><?= $list->create_date ?></td>
            <td><?= $list->content ?></td>
            <td>
                <?php
                if ($list->uidx == $_SESSION['user']->idx) {
                ?>
                    <a href="/review/delete/<?=$list->idx?>" class="btn btn-danger">삭제</a>
                <?php
                } else {
                    echo "-";
                }
                ?>
            </td>
            <td><a href="" class="btn btn-primary">목록</a></td>
        </tr>
    </tbody>

</table>

<h3 class="mt-5">댓글</h3>
<form action="/review/comment/add/process" method="POST" class="mt-3">
    <input type="hidden" name="idx" value="<?=$idx?>">
    <div class="input-group">
        <input type="text" class="form-control" name="comment">
        <button class="btn btn-primary">작성</button>
    </div>
</form>

<table class="table mt-5">
    <thead>
        <tr>
            <th>작성자</th>
            <th>내용</th>
            <th>작성일</th>
            <th>삭제</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($comment as $key=>$value) {
            ?>
            <tr>
                <td><?=$comment[$key]->name?></td>
                <td><?=$comment[$key]->comment?></td>
                <td><?=$comment[$key]->create_date?></td>
                <td>
                    <?php
                    if($comment[$key]->uidx == $_SESSION['user']->idx) {
                        ?>
                        <a href="/comment/delete/<?=$comment[$key]->idx?>" class="btn btn-danger">삭제</a>
                        <?php
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
    td,
    th {
        text-align: center;
    }

    thead {
        background-color: #333;
        color: white;
    }
</style>