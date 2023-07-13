<h3 class="mt-5">객실등록</h3>
<form action="/room/register/process" method="POST" class="mt-3" enctype="multipart/form-data">
    <div class="input-group">
        <span class="input-group-text">객실 이름</span>
        <input type="text" class="form-control" name="name">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">객실 사진(최대 4장)</span>
        <input type="file" class="form-control" name="file[]" multiple>
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">객실 이용요금</span>
        <input type="text" class="form-control" name="price">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">객실 설명</span>
        <textarea name="introduce" class="form-control" cols="30" rows="10"></textarea>
    </div>
    <button class="mt-3 btn btn-primary">객실 등록</button>
</form>