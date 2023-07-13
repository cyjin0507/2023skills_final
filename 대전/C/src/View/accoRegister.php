<h3 class="mt-5">숙박업소등록</h3>

<form action="<?=isset($data) ? '/acco/modify/process' : '/acco/register/process'?>" method="POST" class="mt-3" enctype="multipart/form-data">
     <div class="input-group">
        <span class="input-group-text">숙박업소</span>
        <select name="type" class="form-control">
            <option value="type1" <?=isset($data) ? ($data->type=="type1" ? 'selected' : '') : ''?>>호텔</option>
            <option value="type2" <?=isset($data) ? ($data->type=="type2" ? 'selected' : '') : ''?>>콘도</option>
            <option value="type3" <?=isset($data) ? ($data->type=="type3" ? 'selected' : '') : ''?>>펜션</option>
            <option value="type4" <?=isset($data) ? ($data->type=="type4" ? 'selected' : '') : ''?>>모텔</option>
            <option value="type5" <?=isset($data) ? ($data->type=="type5" ? 'selected' : '') : ''?>>민박</option>
            <option value="type6" <?=isset($data) ? ($data->type=="type6" ? 'selected' : '') : ''?>>게스트하우스</option>
        </select>
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">대표사진</span>
        <input type="file" class="form-control" name="file">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">숙박업소이름</span>
        <input type="text" class="form-control" name="name" value="<?=isset($data) ? $data->name : ''?>">
    </div>
    <canvas width="500" height="500" class="mt-3" style="display: block;">

    </canvas>
    <input type="hidden" name="loc" id="loc">
    <button class="btn btn-primary mt-3">숙박업소 등록</button>

</form>

<script>


    
    const img = new Image()
    img.src = '/resources/image/map.png'
    
    let isDragging = false
    
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')


    canvas.addEventListener('click', ()=> {
        isDragging = !isDragging
        if(!isDragging) {
            $('#loc').val(JSON.stringify({x,y}))
        }
    })

    img.onload = () => {
        ctx.drawImage(img, 0, 0, 500, 500)
    }

    const mark = new Image()
    mark.src = '/resources/image/asset.png'

    let x = 0
    let y = 0

    mark.onload = () => {
        $('canvas').on('mousemove', (e) => {
            if(!isDragging) {return}
            ctx.clearRect(0, 0, 500, 500)
            ctx.drawImage(img, 0, 0, 500, 500)

            // 지금은 대충 캔버스 x,y 좌표 임의로 정해서 했는데 실제는 코드로 구해야함
            x = e.pageX - 30 - canvas.getBoundingClientRect().x
            y = e.pageY - 40 - canvas.getBoundingClientRect().y
            ctx.drawImage(mark, x, y, 30, 40)
        })

        <?php
        if(isset($data)) {
        ?>
            ctx.drawImage(mark, <?=json_decode($data->loc)->x?>, <?=json_decode($data->loc)->y?>, 30, 40)
        <?php
        }
    ?>
    }
</script>