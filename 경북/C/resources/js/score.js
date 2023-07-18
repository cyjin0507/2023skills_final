class Score {
    constructor() {
        this.init()
    }

    // 기본세팅
    init() {
        this.jsonData = []

        this.getJson()
        setInterval(async () => {
            this.getJson()
        }, 4900)

        this.table = document.querySelector(".score-table")
        this.saveBtn = document.querySelector(".save")
        this.backBtn = document.querySelector(".back")
        this.name = document.querySelector(".name").innerHTML
        this.score = document.querySelector(".score").innerHTML
        this.time = document.querySelector("#time").innerHTML
        this.gameValue = document.querySelector(".game-value").value
        this.addEvent()
    }

    // 한글 찾기
    getInitSound(src) {
        let init = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        let iSound = '';
        for (let i = 0; i < src.length; i++) {
            let index = Math.floor(((src.charCodeAt(i) - 44032) / 28) / 21);
            if (index >= 0) {
                iSound += init[index];
            }
        }
        return iSound;
    }

    // 이벤트 추가
    addEvent() {

        this.saveBtn.addEventListener('click', async () => {
            await fetch('/game', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    name: this.name,
                    score: this.score,
                    time: this.time,
                    gameValue: this.gameValue
                })
            })
            this.getJson()
        })
        this.backBtn.addEventListener('click', () => {
            window.history.back()
        })
    }

    // json 받아오기 
    async getJson() {
        let jsonData;
        await $.ajax({
            url: '/getGame?random=' + Math.random(),
            dataType: 'json',
            cache: "false",
            success: function (res) {
                jsonData = res
            }
        });
        this.jsonData = jsonData

        this.table.innerHTML = ""

        this.setData()
    }

    // html에 넣기
    setData() {
        const eng = /[a-zA-Z]/;
        const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
        let html = `
        <tr>
                        <th>사용자의 이름</th>
                        <th>게임 결과</th>
                        <th>게임 번호</th>
                        <th>게임 이름</th>
                        <th>시간</th>
                    </tr>
        `

        
        this.table.innerHTML += html
        this.jsonData.forEach(x => {
            let name;
            if(kor.test(x.name)){
                name = this.getInitSound(x.name)
            } else if(eng.test(x.name)) {
                name = x.name.slice(0, 3)                
                if(x.name.length > 3) {                     
                    name = name.padEnd(x.name.length, '*')
                }
            } else {
                name = x.name
            }

            html = `
           <tr>
           <td>${name}</td>
           <td>${x.count}</td>
           <td>${x.game}</td>
           <td>${x.game == 0 ? '호두과자먹기 캐릭터 게임' : '천안 명물 받아먹기 게임'}</td>
           <td>${x.time}</td>
       </tr>`

            this.table.innerHTML += html
        })
    }
}