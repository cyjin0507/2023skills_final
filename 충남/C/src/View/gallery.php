<h3 class="mt-5">여행갤러리</h3>
<div class="grid mt-3">
        
</div>
<form class="mt-3" id="img-form">
    <input type="file" class="form-control" name="upload_file" style="width: 200px;">
    <button type="button" onclick="imgAdd(this.form)" class="btn btn-primary mt-2" id="img-add-btn">사진 추가</button>
</form>


<script>
    function imgAdd(form) {
        let check = form.upload_file.value
        if(!check) {
            alert('업로드할 파일을 선택하세요.')
            
        }
    }
</script>

    <style>

        .grid {
            position: relative;
            height: 600px;
        }

        .box {
            width: 150px;
            height: 150px;
            position: absolute;
            transition: all .5s;
        }

        .box-inner {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .box img {
            width: 100%;
            height: 100%;
        }

        .delete {
            position: absolute;
            top: 0;
            left: 100%;
            transform: translateX(-100%);
            padding: 10px;
            background-color: white;
        }

    </style>

    <script src="/script/gallery.js"></script>