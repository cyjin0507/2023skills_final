<h3 class="mt-5">셔틀버스투어예약</h3>

<h5 class="mt-5">천안역</h5>
<table class="table mt-3" id="begin1">
    <thead>
        <tr>
            <th>차량대표사진</th>
            <th>투어코스</th>
            <th>차량번호</th>
            <th>차량종류</th>
            <th>탑승위치</th>
            <th>날짜및시간</th>
            <th>좌석</th>
        </tr>
    </thead>
    <tbody>
    
    </tbody>
</table>

<h5 class="mt-5">유관순사적지</h5>
<table class="table mt-3" id="begin2">
    <thead>
        <tr>
            <th>차량대표사진</th>
            <th>투어코스</th>
            <th>차량번호</th>
            <th>차량종류</th>
            <th>탑승위치</th>
            <th>날짜및시간</th>
            <th>좌석</th>
        </tr>
    </thead>
    <tbody>
    
    </tbody>
</table>

<h5 class="mt-5">독립기념관</h5>
<table class="table mt-3" id="begin3">
    <thead>
        <tr>
            <th>차량대표사진</th>
            <th>투어코스</th>
            <th>차량번호</th>
            <th>차량종류</th>
            <th>탑승위치</th>
            <th>날짜및시간</th>
            <th>좌석</th>
        </tr>
    </thead>
    <tbody>
    
    </tbody>
</table>

<div id="seatModal">
    <div class="modalInner">
        <div id="seat-grid">
            
        </div>
        <div id="modal-btn-group">
            <form action="/tour/payment" method="post" id="reserv-form">
                <input type="hidden" name="start">
                <input type="hidden" name="reserv">
                <input type="hidden" name="idx">
                <input type="hidden" name="time">
                <button type="button" class="btn btn-primary" id="reserv-btn">예약하기</button>
            </form>
            <button class="btn btn-secondary close">닫기</button>
        </div>
    </div>
</div>

<script>
    let response = ""

    let reservArr = []
    let start = ""
    let time = ""
    let idx = -1

    window.onload = async() => {
        response = await $.getJSON('/bus/all/info/get')
        draw()
        
        $('.seat-btn').click((e)=>this.seatModal(e))
        $('.close').click(()=> {
            $('#seatModal').fadeOut()
        })

        $('#reserv-btn').click(()=>reserv())
        
    }

    async function seatModal(e) {
        idx = e.target.dataset.idx
        start = e.target.dataset.start
        time = e.target.dataset.time
        $('#seatModal').fadeIn()
        let data = await $.getJSON(`/seat/info/get/${idx}`)
        let seatData = JSON.parse(data.seat)
        
        let key = Object.keys(seatData)
        let value = Object.values(seatData)

        $('#seat-grid').html('')
        key.forEach((x,i)=> {
            let val = value[i]
            if(val) {
                $('#seat-grid').append(`
                    <div>
                        <button class="btn btn-danger">예약불가</button>
                    </div>
                `)
            } else {
                $('#seat-grid').append(`
                    <div>
                        <button data-seat="${x}" class="btn btn-success seat-check">좌석확인</button>
                        <p>${x}</p>
                        <input type="checkbox" data-seat="${x}" data-start="${start}" style="display:none">
                    </div>
                `)
            }
        })

        $('.seat-check').click((e)=>seatCheck(e))

    }

    async function seatCheck(e) {
        let seat = e.target.dataset.seat
        let data = await $.getJSON(`/reserv/seat/check/${idx}`)
        let check = false
        data.forEach(x=> {
            let list = JSON.parse(x.seat)
            if(list.includes(seat)) {
                check = true
            }
        })

        if(check) {
            alert("이미 예약이 완료된 자리입니다.")
            return
        }

        $(`input[data-seat="${seat}"]`).css('display', 'block')
        $(`input[data-seat="${seat}"]`).on('change',(e)=>{ 
            if(e.target.checked) {
                reservArr.push(seat)
            } else {
                reservArr.splice(reservArr.indexOf(seat),1)
            }
        })
    }

    function reserv() {
        $('input[name="reserv"]').val(JSON.stringify(reservArr))
        $('input[name="idx"]').val(idx)
        $('input[name="start"]').val(start)
        $('input[name="time"]').val(time)
        $('#reserv-form').submit()
    }


    function draw() {
        let place = ["천안역", "유관순사적지", "독립기념관"]
        let dom = [$('#begin1 tbody'), $('#begin2 tbody'), $('#begin3 tbody')]
        for(let i=0; i<place.length; i++) {
            let data = response.filter(x=>x.begin==place[i])
            dom[i].html('')
            data.forEach(x=> {
                let arr = [x.begin, x.start, x.middle, x.end]
                let time = x.time

                
                for(let j=1; j<arr.length; j++) {
                    time = setTime(x.date + " " + time, arr[j-1], arr[j])
                    if(!checkTime(x.date + " " + time)) {continue}
                    dom[i].append(`
                        <tr>
                            <td><img src="/upload/${x.image}" alt=""></td>
                            <td>${x.start} -> ${x.middle} -> ${x.end} -> ${x.begin}</td>
                            <td>${x.number}</td>
                            <td>${x.type}</td>
                            <td>${arr[j]}</td>
                            <td>${x.date} ${time}</td>
                            <td><button class="btn btn-success seat-btn" data-idx="${x.idx}" data-start="${arr[j]}" data-time="${time}">좌석</button></td>
                        </tr>
                    `)
                }
            })
        }


        function checkTime(time) {
            time = new Date(time)
            now = new Date()
            let check = new Date(now.setMinutes(now.getMinutes() + 10))
            return time > check

        }

        function setTime(time, before, now) {
            let returnTime = 0
            if(before==now) {returnTime = 0}
            else if((before=="유관순사적지"&&now=="천안역") || (now=="유관순사적지"&&before=="천안역")) {returnTime = 20}
            else if((before=="독립기념관"&&now=="천안역") || (now=="독립기념관"&&before=="천안역")) {returnTime = 40}
            else if((before=="유관순사적지"&&now=="독립기념관") || (now=="유관순사적지"&&before=="독립기념관")) {returnTime = 30}

            time = new Date(time)
            let date = new Date(time.setMinutes(time.getMinutes()+returnTime))

            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
            
    }

        

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
        width: 70px;
        height: 70px;
        object-fit: cover;
    }

    #seatModal {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.5);
        display: none;
    }

    .modalInner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 550px;
        background-color: white;
        border-radius: 10px;
        padding: 25px;
        border: 1px solid #eaeaea;
    }

    #seat-grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);
    }

    #seat-grid > div {
        border: 1px solid #eaeaea;
        height: 120px;
    }

    #seat-grid > div > button {
        margin: 40px 22px;
    }

    #seat-grid > div > p {
        margin-top: -30px;
        text-align: center;
    }

    #seat-grid > div > input {
        margin-top: -115px;
        display: block;
        position: relative;
        z-index: 2;
        margin-left: 62px;
    }

    #modal-btn-group {
        margin-top: 50px;
    }

    input[type="checkbox"] {
        display: none;
    }

</style>