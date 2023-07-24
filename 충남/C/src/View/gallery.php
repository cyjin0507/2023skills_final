<h3 class="mt-5">여행갤러리</h3>
<div class="grid mt-3">
        
</div>
<form class="mt-3" id="img-form">
    <input type="file" class="form-control" name="upload_file[]" multiple style="width: 200px;">
    <button type="button" onclick="imgAdd(this.form)" class="btn btn-primary mt-2" id="img-add-btn">사진 추가</button>
</form>


<script>
    async function imgAdd(form) {
        // let check = form.upload_file.value
        // if(!check) {
        //     alert('업로드할 파일을 선택하세요.')
        //     return false
        // }

        let formData = new FormData(form)
        const response = await $.ajax({
            url: '/gallery/image/insert',
            type: 'POST',
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData	: false,
            contentType	: false,
            data		: formData,
            async		: false,
            success		: function(response) {
                if(response == "failed") {
                    alert("파일 업로드에 문제가 발생하였습니다."); 
                    return false;
                } else {
                    alert("파일 업로드가 완료되었습니다.");		
                    return true;
                }
            }
        })


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