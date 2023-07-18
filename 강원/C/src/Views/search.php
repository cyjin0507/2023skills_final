<h1>상영작 검색</h1>

<form action="/search" method="post">
    <input type="text" name="search" id="search" placeholder="검색어">
    <select name="type" id="type">
        <option value="0" selected>극영화</option>
        <option value="1">다큐멘터리</option>
        <option value="2">애니메이션</option>
        <option value="3">기타</option>
    </select>
    <button class="btn btn-primary">
        검색버튼
    </button>
</form>
<p>총 리스트수 : <?=$cnt?></p>
<p>검색수 : <?=count($search)?></p>

<table class="table">
    <thead>
        <tr>
            <th>출품자이름/아이디</th>
            <td>영화제목</td>
            <td>러닝타임</td>
            <td>제작년도</td>
            <td>분류</td>
        </tr>
    </thead>
    <tbody>
        <?php foreach($search as $item) :  ?>
            <tr>
                
                <td><?=$item->name. "/" . $item->id?></td>
                <td><?=$item->movie?></td>
                <td><?=$item->time?></td>
                <td><?=$item->year?></td>
                <td><?= $item->type == 0 ? '극영화' :( $item->type == 1 ? '다큐멘터리영화' :( $item->type == 2 ? '애니메이션' : '기타')) ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>