<h3 class="mt-5">카테고리</h3>
<ul class="nav nav-pills mt-3">
  <li class="nav-item">
    <a class="nav-link <?=$category==0 ? 'active' : ''?>" href="/category/0/0">의류</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category==1 ? 'active' : ''?>" href="/category/1/0">펜시</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category==2 ? 'active' : ''?>" href="/category/2/0">생활용품</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?=$category==3 ? 'active' : ''?>" href="/category/3/0">식품</a>
  </li>
</ul>

<a href="/category/<?=$category?>/1" class="btn <?=$sort==1 ? 'btn-primary' : 'btn-light'?> mt-4">인기순</a>
<a href="/category/<?=$category?>/2" class="btn <?=$sort==2 ? 'btn-primary' : 'btn-light'?> mt-4">판매순</a>
<a href="/category/<?=$category?>/3" class="btn <?=$sort==3 ? 'btn-primary' : 'btn-light'?> mt-4">가격순</a>

<table class="table mt-4">
    <thead>
        <tr>
            <th>상품명</th>
            <th>상품가격</th>
            <th>상품이미지</th>
            <th>상품간략설명</th>
            <th>제고수량</th>
            <th>조회수</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($data as $key=>$value) {
            ?>
            <tr>
                <td><a href="/product/<?=$data[$key]->idx?>"><?=$data[$key]->product?><?=$data[$key]->quantity <= 0 ? '<span style="color:red">(품절)</span>' : ''?></a></td>
                <td><?=$data[$key]->price?></td>
                <td><img src="/img/<?=$data[$key]->img?>.jpg" alt=""></td>
                <td><?=$data[$key]->shortinfo?></td>
                <td><?=$data[$key]->quantity?></td>
                <td><?=$data[$key]->hit?></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<style>

    thead {
        background-color: #333;
        color: white;
    }

    th, td {
        text-align: center;
    }

    table img {
        width: 70px;
        height: 70px;
        object-fit: cover;
    }

</style>