class Manage {
    constructor() {
        this.init()
    }
    // 기본 세팅
    init() {
        this.jsonData = []
        this.manageType = window.location.href.includes('Game') ? true : false;

        this.getJson()

        this.searchBtn = document.querySelector(".search-btn")
        this.search = document.querySelector("#search")
        this.table = document.querySelector(".manage-table")
        this.order = document.querySelector("#order")
        this.idx = window.location.href.split('idx=')[1];

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
        this.order.addEventListener('change', () => {
            this.idx = ""
            this.getJson()
        })
        this.searchBtn.addEventListener('click', () => {
            if (this.search.value != "") {
                this.idx = ""
                this.getJson()
            } else {
                alert("검색창에 검색어를 입력해주세요")
            }
        })
    }

    // json 받아오기 
    async getJson() {
        let jsonData, url;
        if (this.manageType) {
            url = '/getGameManage?random=' + Math.random()
        } else {
            url = '/getReviewManage?random=' + Math.random()
        }
        await $.ajax({
            url: url,
            dataType: 'json',
            cache: "false",
            success: function (res) {
                jsonData = res
            }
        });
        this.jsonData = jsonData

        this.orderAsc()
    }

    // 정렬 하기
    async orderAsc() {
        if (this.manageType) {
            if (this.order.value == "dateAsc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date)
                })
            } else if (this.order.value == "dateDesc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date)
                })
            } else if (this.order.value == "scoreASC") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return parseInt(a.count) - parseInt(b.count)
                })
            } else if (this.order.value == "scoreDesc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return parseInt(b.count) - parseInt(a.count)
                })
            }
        } else {
            if (this.order.value == "dateAsc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return new Date(a.visit) - new Date(b.visit)
                })
            } else if (this.order.value == "dateDesc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return new Date(b.visit) - new Date(a.visit)
                })
            } else if (this.order.value == "scoreASC") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return parseInt(a.rate) - parseInt(b.rate)
                })
            } else if (this.order.value == "scoreDesc") {
                this.jsonData = this.jsonData.sort(function (a, b) {
                    return parseInt(b.rate) - parseInt(a.rate)
                })
            }
        }
        this.setData()
    }

    // html에 넣기
    setData() {
        this.table.innerHTML = ""

        const eng = /[a-zA-Z]/;
        const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        let html;
        if (this.manageType) {

            html = `
            <tr>
            <th>데이터 번호</th>
            <th>게임 이름</th>
            <th>사용자 이름</th>
            <th>게임 결과</th>
            <th>데이터 삽입 날짜</th>
            <th>삭제 버튼</th>
            </tr>
            `
        } else {
            html = `
            <tr>
            <th>데이터 번호</th>
            <th>천안의 명소 제목</th>
            <th>방문 날짜</th>
            <th>평점</th>
            <th>내용</th>
            <th>명소 데이터 번호</th>            
            <th>수정 버튼</th>
            <th>삭제 버튼</th>
            </tr>
            `
        }

        this.table.innerHTML = html

        this.jsonData.forEach(x => {

            if (this.manageType) {
                x.date = x.date.slice(0, 10)
                x.game = x.game == 0 ? '호두과자먹기 캐릭터 게임' : '천안 명물 받아먹기 게임';
                if (kor.test(x.name)) {
                    x.name = this.getInitSound(x.name)
                } else if (eng.test(x.name)) {
                    let name;
                    name = x.name.slice(0, 3)
                    if (x.name.length > 3) {
                        x.name = name.padEnd(x.name.length, '*')
                    }
                }
            }

            // 검색어 하이라이트 감싸기 
            if (this.search.value != "") {
                Object.keys(x).forEach(i => {
                    x[i] = this.searchText(x[i])
                    if (!x.type) {
                        if (x[i].includes('span')) {
                            x.type = true;
                        } else {
                            x.type = false;
                        }
                    }
                })
            }

            if (this.manageType) {
                html = `
                <tr>
                <td>${x.idx}</td>
                <td>${x.game}</td>
                <td>${x.name}</td>
                <td>${x.count}</td>
                <td>${x.date}</td>
                <td><a href="/delete?idx=${x.idx}&type=game" class="btn btn-danger">삭제 버튼</a></td>
                </tr>`
            } else {
               
                if(this.idx && this.idx == x.idx) {
                    html = `
                    <tr>                    
                    <td><input type="text" name="idx" value="${x.idx}"><input type="hidden" name="idxValue" value="${x.idx}"></td>
                    <td><input type="text" name="title" value="${x.title}"></td>
                    <td><input type="text" name="visit" value="${x.visit}"></td>
                    <td><input type="text" name="rate" value="${x.rate}"></td>
                    <td><input type="text" name="text" value="${x.text}"></td>
                    <td><input type="text" name="place" value="${x.place}"></td>
                    <td>  <input type="submit" value="수정 버튼" class="btn btn-primary"></td>
                    <td><a href="/manageReview" class="btn btn-danger">취소 버튼</a></td>                   
                    </tr>
                    `
                    
                } else {
                    html = `
                    <tr>
                    <td>${x.idx}</td>
                    <td>${x.title}</td>
                    <td>${x.visit}</td>
                    <td>${x.rate}</td>
                    <td>${x.text}</td>
                    <td>${x.place}</td>
                    <td><a href="/manageReview?idx=${x.idx}" class="btn btn-primary">수정 버튼</a></td>
                    <td><a href="/delete?idx=${x.idx}&type=review" class="btn btn-danger">삭제 버튼</a></td>
                    </tr>`
                }
            }
            if (this.search.value != "") {
                if (x.type) {
                    this.table.innerHTML += html
                }
            } else {
                this.table.innerHTML += html
            }
        })
    }

    // 검색어 사이에 하이라이트 넣기
    searchText(text) {
        let regex = new RegExp(this.search.value, "g");
        return text.replace(regex, "<span class='highlight'>" + this.search.value + "</span>");
    }
}
window.addEventListener("load", () => {
    new Manage()
})