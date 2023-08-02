<h3 class="mt-5">결제페이지</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>차량종류</th>
            <th>차량번호</th>
            <th>차량대표사진</th>
            <th>출발위치</th>
            <th>출발시간</th>
            <th>투어코스</th>
            <th>좌석</th>
            <th>구분</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><?= $data->type ?></td>
            <td><?= $data->number ?></td>
            <td><img src="/upload/<?= $data->image ?>" alt=""></td>
            <td><?= $startLoc ?></td>
            <td><?= $time ?></td>
            <td><?= $data->start ?> -> <?= $data->middle ?> -> <?= $data->end ?></td>
            <td>
                <?php
                foreach (json_decode($seat) as $key => $value) {
                    echo json_decode($seat)[$key] . "<br>";
                }
                ?>
            </td>
            <td>
                <?php
                foreach (json_decode($seat) as $key => $value) {
                    if ($key == 0) {
                        $age = 2023 - substr($_SESSION['user']->birth, 0, 4);
                        if ($age <= 13) {
                            echo "<span class='user-age'>어린이</span>";
                        } else if ($age >= 14 && $age <= 19) {
                            echo "<span class='user-age'>청소년</span>";
                        } else if ($age >= 20 && $age <= 64) {
                            echo "<span class='user-age'>성인</span>";
                        } else if ($age >= 65) {
                            echo "<span class='user-age'>경로우대</span>";
                        }
                    } else {
                ?>
                        <select class="form-control type" style="width: 120px;">
                            <option value="어린이">어린이</option>
                            <option value="청소년">청소년</option>
                            <option value="성인">성인</option>
                            <option value="경로우대">경로우대</option>
                        </select>
                <?php
                    }
                }
                ?>
            </td>
        </tr>
    </tbody>
</table>

<h5 class="mt-3">결제 금액 : <span id="price"></span>원</h5>

<div id="json" style="display: none;"><?=$seat?></div>

<form action="/tour/reservation/process" method="POST">
    <input type="hidden" name="idx" value="<?=$bidx?>">
    <input type="hidden" name="seat" value="<?=$seat?>">
    <input type="hidden" name="start" value="<?=$startLoc?>">
    <input type="hidden" name="type">
    <input type="hidden" name="price">
    <input type="hidden" name="reserv_time" value="<?=$time?>">
    <button class="btn btn-primary">결제하기</button>
</form>

<script>
    let price = 0

    let typeArr = []

    $('input[name="seat"]').val($('#json').html())

    if ($('.user-age').html() == '어린이') {
        price = 5000
    } else if ($('.user-age').html() == '청소년') {
        price = 7000
    } else if ($('.user-age').html() == '성인') {
        price = 8000
    } else if ($('.user-age').html() == '경로') {
        price = 4000
    }
    let total = price

    typeArr.push($('.user-age').html())

    priceSet()

    document.querySelectorAll('.type').forEach((x,i)=> {
        x.addEventListener('change', (e)=> {
            typeArr.slice(i+1, 1)
            typeArr.splice(i+1,1,x.value)
            $('input[name="type"]').val(JSON.stringify(typeArr))
            priceSet()
        })
    })

    function priceSet() {
        total = price
        document.querySelectorAll('.type').forEach(x => {
            if (x.value == '어린이') {
                total += 5000
            } else if (x.value == '청소년') {
                total += 7000
            } else if (x.value == '성인') {
                total += 8000
            } else if (x.value == '경로') {
                total += 4000
            }
        })

        $('#price').html(total.toLocaleString())
        $('input[name="price"]').val(total)
    }


    // $('#price')
</script>

<style>
    thead {
        background-color: #333;
        color: white;
    }

    th,
    td {
        text-align: center;
    }

    table img {
        width: 70px;
        height: 70px;
        object-fit: cover;
    }
</style>