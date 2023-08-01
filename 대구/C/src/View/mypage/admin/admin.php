<h3 class="mt-5">마이페이지 (관리자)</h3>

<table class="table mt-5">
    <thead>
        <tr>
            <th>차량종류</th>
            <th>투어코스</th>
            <th>차량대표사진</th>
            <th>출발위치</th>
            <th>배차날짜및시간</th>
            <th>승인버튼</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($list as $key => $value) {
            ?>
            <tr>
                <td><?=$list[$key]->type?></td>
                <td><?=$list[$key]->start?> -> <?=$list[$key]->middle?> -> <?=$list[$key]->end?></td>
                <td><img src="/upload/<?=$list[$key]->image?>" alt=""></td>
                <td><?=$list[$key]->begin?></td>
                <td>
                    <input type="date" data-idx="<?=$list[$key]->idx?>" class="date">
                    <input type="time" data-idx="<?=$list[$key]->idx?>" class="time">
                </td>
                <td><button data-idx="<?=$list[$key]->idx?>" class="btn btn-success accept-btn">승인버튼</button></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>

<script>
    $('.accept-btn').click((e)=> {
        let idx = e.target.dataset.idx
        let date = $(`.date[data-idx="${idx}"]`).val()
        let time = $(`.time[data-idx="${idx}"]`).val()
        
        if(parseInt(date.slice(5,7)) <3 || parseInt(date.slice(5,7))>11) {
            alert("날짜는 3월~11월 사이만 가능합니다.")
            return
        }

        if(getDayOfWeek(date) == '월' ||
        getDayOfWeek(date) == '수' ||
        getDayOfWeek(date) == '금') {
            alert("날짜는 화, 목, 토, 일만 가능합니다.")
            return
        }

        if(time < '10:00' || time > '17:00') {
            alert("시간은 10:00 ~ 17:00만 가능합니다.")
            return
        }

        window.location.href = `/bus/admin/accept/${idx}/${date}/${time}`


    })

    function getDayOfWeek(날짜문자열){
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[new Date(날짜문자열).getDay()];
        return dayOfWeek;
    }

</script>

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