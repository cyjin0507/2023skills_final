let response = ""
let reserveArr = []

let time = 0
let start = ""
let idx = -1

window.onload = async() => {
    response = await $.getJSON('/tour/all/get')

    draw()

    $('.seat-modal').click(seatModal)

    
}

async function seatModal(e) {
    idx = e.target.dataset.idx
    start = e.target.dataset.start
    time = e.target.dataset.time

    const data = await $.getJSON(`/seat/info/${idx}`)
    const seat = JSON.parse(data.seat)

    const key = Object.keys(seat)
    const value = Object.values(seat)

    $('#seat-grid').html('')

    key.forEach((x,i)=> {
        if(value[i]) {
            $('#seat-grid').append(`
                <div>
                    <button class='btn btn-danger'>삭제</button>
                </div>
            `)
        } else {
            $('#seat-grid').append(`
                <div>
                    <button class='btn btn-primary seat-check' data-seat=${x}>좌석확인</button>
                    <input type='checkbox' class='checkbox' data-seat=${x} data-start=${start} data-time=${time} style='display:none;'>
                </div>
            `)
        }
    })

    $('.seat-check').click(seatCheck)
}

async function seatCheck(e) {
    let seat = e.target.dataest.seat

    const data = await $.getJSON(`/reserve/info/${idx}`)
    let check = true
    
    data.forEach(x=> {
        let json = JSON.parse(x.seat)
        if(json.includes(seat)) {
            check = false
        }
    })

    if(!check) {
        alert("이미 예약된 자리입니다.")
        return
    }

    reserveArr = []

    $(`.checkbox[data-seat="${seat}"]`).css('display', 'block')
    document.querySelectorAll(`.checkbox[data-seat="${seat}"]`).forEach((x)=> {
        if(x.target.checked) {
            reserveArr.push(x)
        } else {
            reserveArr.splice(reserveArr.indexOf(x),1)
        }
    })

}

function draw() {
    let dom = [$('#begin1 tbody'), $('#begin2 tbody'), $('#begin3 tbody')]
    let place = ["천안역", "유관순열사사적지", "독립기념관"]

    for(let i=0; i<place.length; i++) {
        dom[i].html('')
        let findData = response.filter(x=> x.begin == place[i])
        findData.forEach(x=> {
            let arr = [x.begin, x.start, x.middle, x.end]
            let time = x.time
            for(let j=1; j<arr.length; j++) {
                time = setTime(time, arr[j-1], arr[j])
                if(checkTime(x.date + " " + x.time)) continue
                dom[i].append(`
                
                `)
            }
        })
    }
}

function setTime(value, before, now) {
    const time = new Date(value)

    let returnTime = 0
    

    const date = new Date(time.setMinutes(time.getMinutes() + returnTime))
    return date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds()
}

function checkTime(value) {
    const today = new Date()
    const time = new Date(value)

    const date = new Date(time.setMinutes(time.getMinutes() + 10))
    return date > today
}