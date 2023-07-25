class Calender {
    constructor() {
        this.nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
        this.today = new Date();     // 페이지를 로드한 날짜를 저장
        this.today.setHours(0,0,0,0);  

        this.draw()
        this.addEvent()
    }

    addEvent() {
        $('#after').click(this.nextCalendar.bind(this))
        $('#before').click(this.prevCalendar.bind(this))

        $('.reserv-btn').click(this.reservModal.bind(this))
    }

    reservModal(e) {
        $('#reserv-modal').css('display', 'none')

        $('tbody td').css('background-color', 'white')
        $(e.target).closest('td').css('background-color', 'skyblue')

        let index = e.target.dataset.idx
        let top = Math.ceil(index / 7)
        let left = index % 7 == 0 ? 7 : index % 7

        let topVal = 182 + 100 * (top - 1)
        let leftVal = 185 * (left - 2)


        $('#reserv-modal').css({
            "top" : topVal + "px",
            "left" : leftVal + "px",
        })
        $('#reserv-modal').fadeIn()

    }

    prevCalendar() {
        this.nowMonth = new Date(this.nowMonth.getFullYear(), this.nowMonth.getMonth() - 1, this.nowMonth.getDate());   // 현재 달을 1 감소
        this.draw();    // 달력 다시 생성
        this.addEvent()
    }
    // 다음달 버튼 클릭
    nextCalendar() {
        this.nowMonth = new Date(this.nowMonth.getFullYear(), this.nowMonth.getMonth() + 1, this.nowMonth.getDate());   // 현재 달을 1 증가
        this.draw();    // 달력 다시 생성
        this.addEvent()
    }

    draw() {
        let firstDate = new Date(this.nowMonth.getFullYear(), this.nowMonth.getMonth(), 1);     // 이번달 1일
            let lastDate = new Date(this.nowMonth.getFullYear(), this.nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

            let tbody_Calendar = document.querySelector(".calendar > tbody");
            document.getElementById("calYear").innerText = this.nowMonth.getFullYear();             // 연도 숫자 갱신
            document.getElementById("calMonth").innerText = this.leftPad(this.nowMonth.getMonth() + 1);  // 월 숫자 갱신

            while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
                tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
            }

            let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

            let idx = 0

            for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
                idx++
                let nowColumn = nowRow.insertCell();        // 열 추가
            }

            for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  
                idx++

                let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
                nowColumn.innerHTML = `
                <div>${this.leftPad(nowDay.getDate())}</div>
                <button data-idx=${idx} class="btn btn-primary reserv-btn">예약가능</button>
                `;      // 추가한 열에 날짜 입력

            
                if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
                    nowColumn.style.color = "#DC143C";
                }
                if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
                    nowColumn.style.color = "#0000CD";
                    nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
                }

            }
    }

    leftPad(value) {
        if (value < 10) {
            value = "0" + value;
            return value;
        }
        return value;
    }

}

new Calender()