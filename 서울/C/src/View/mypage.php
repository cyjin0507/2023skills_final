


<h3 class="mt-5">나의 예약현황</h3>
<table class="table mt-3">
    <thead>
        <tr>
            <th>시설이름</th>
            <th>예약일</th>
            <th>기간</th>
            <th>인원수</th>
            <th>전화번호</th>
            <th>신청인</th>
            <th>차량번호</th>
            <th>수정</th>
            <th>취소</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach($data as $key=>$value) {
            $type = substr($data[$key]->cidx, 0,1);
            $num = substr($data[$key]->cidx, (strlen($data[$key]->cidx) - 1) * -1,strlen($data[$key]->cidx) - 1);
            $name = $type == "a" ? "숲속의 집" : "오토캠핑장";

            $termType = $data[$key]->term==1 ? '1박2일' : ($data[$key]->term==2 ? '2박3일' : '3박4일');
            ?>
            <tr>
                <td><?=$name . " " . $num?>호</td>
                <td><?=$data[$key]->reserv_date?></td>
                <td><?=$termType?></td>
                <td><?=$data[$key]->people?>명</td>
                <td><?=$data[$key]->phone?></td>
                <td><?=$data[$key]->applicant?></td>
                <td><?=$data[$key]->car?></td>
                <td><button class="btn btn-warning">수정</button></td>
                <td><a href="/reserv/delete/<?=$data[$key]->idx?>" class="btn btn-danger">취소</a></td>
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

    td, th {
        text-align: center;
    }
</style>