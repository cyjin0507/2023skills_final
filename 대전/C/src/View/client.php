<h3 class="mt-5">탭 메뉴 영역</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link <?=$category=='type1' ? 'active' : ''?>" href="/acco/type1/<?=$search?>">호텔</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category=='type2' ? 'active' : ''?>" href="/acco/type2/<?=$search?>">콘도</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category=='type3' ? 'active' : ''?>" href="/acco/type3/<?=$search?>">펜션</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category=='type4' ? 'active' : ''?>" href="/acco/type4/<?=$search?>">모텔</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category=='type5' ? 'active' : ''?>" href="/acco/type5/<?=$search?>">민박</a>
  </li>
  <li class="nav-item">
  <a class="nav-link <?=$category=='type6' ? 'active' : ''?>" href="/acco/type6/<?=$search?>">게스트하우스</a>
  </li>
</ul>

<table class="table mt-4" style="width: 400px;">
    <thead>
        <tr>
            <th>숙박업소 이름</th>
            <th>대표사진</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key=>$value) {
            ?>
            <tr>
                <td><?=$list[$key]->name?></td>
                <td><img src="/resources/upload/<?=$list[$key]->image?>" alt=""></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<h3 class="mt-5">검색영역</h3>
<div class="input-group mt-3" style="width: 250px;">
    <input type="text" class="form-control" id="search">
    <button class="btn btn-primary" id="search-btn">검색</button>
</div>

<canvas class="mt-3" width="500" height="500"></canvas>
<?php
if(!empty($loc)) {
    ?>
    <table class="table mt-4" style="width: 400px;">
        <thead>
            <tr>
                <th>숙박업소 이름</th>
                <th>대표사진</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="/room/detail/<?=$loc->idx?>"><?=$loc->name?></a></td>
                <td><img src="/resources/upload/<?=$loc->image?>" alt=""></td>
            </tr>
        </tbody>
    </table>
    <?php
}
?>
  
<script>
    $('#search-btn').click(()=> {
        window.location.href=`/acco/<?=$category?>/${$('#search').val()}`
    })

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

    <?php
    if(!empty($loc)) {
        ?>
        let x = <?=json_decode($loc->loc)->x?>;
        let y = <?=json_decode($loc->loc)->y?>

        mark.onload = () => {
            ctx.drawImage(mark, x, y, 30, 40)
        }
        <?php
    }
    ?>

</script>


<style>
    th, td {
        text-align: center;
    }

    thead {
        background-color: #333;
        color: white;
    }

    table img {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

</style>