<h1>관리자 페이지</h1>

<form action="/manage" method="post">
    상영일정 :<input type="datetime-local" name="date" id="date" required>
    출품작 선택 <select name="entry" id="entry">
        <?php foreach ($result as $item): ?>
            <option value="<?= $item->idx ?>"><?= $item->movie ?>(<?= $item->time ?>)</option>
            <?php endforeach; ?>
        </select>
        <input type="hidden" name="runtime" value="<?=$item->time?>">
        <input type="hidden" name="title" value="<?=$item->movie?>">
    <button class="btn btn-primary">등록 하기</button>
</form>