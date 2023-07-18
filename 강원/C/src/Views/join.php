<h1>콘테스트 참여하기</h1>

<form action="/join"  method="post" enctype="multipart/form-data">
    <h3><?=$_SESSION['user']['id']?></h3>
    티져 업로드 : <input type="file" name="video" id="video" accept="video/*">
    <input type="submit" class="btn btn-primary" value="콘테스트 참여하기">
</form>

