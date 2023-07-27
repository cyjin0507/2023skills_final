class Place {
    constructor() {
        this.init()
        // setTimeout(()=> {
        //     this.init()
        // },5000)
    }

    async init() {
        const {data} = await $.getJSON('/resources/json/place.json')
        this.data = data

        this.reviewIdx = 0
        this.reviewArr = []

        this.drawList()
        this.addEvent()
    }

    drawList() {
        $('#place-table tbody').html('')
        this.data.forEach(x=> {
            $('#place-table tbody').append(`
                <tr>
                    <td><img src="/resources/imgs/place/${x.idx}.jpg" alt=""></td>
                    <td>${x.title}</td>
                    <td>${x.point}</td>
                    <td>${x.review_cnt}</td>
                    <td>${x.distance}</td>
                    <td><button data-idx=${x.idx} class="btn btn-primary review-btn">리뷰 작성</button></td>
                </tr>
            `)
        })
    }

    addEvent() {
        console.log(new Date().toLocaleDateString());
        $('.review-btn').click(this.reviewPage.bind(this))

        $('#review-date').on('change', (e)=> {
            const dt = new Date()
            let today = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()
            if(new Date(e.target.value) >= new Date(today)) {
                alert("방문날짜는 오늘 전이여야 합니다.")
                e.target.value = ""
            }
        })
    }

    reviewPage(e) {
        this.reviewIdx = e.target.dataset.idx

        $('#place').fadeOut()
        $('#review').fadeIn()

        this.reviewSet()
    }

    reviewSet() {
        const searchData = this.data.filter(x=>x.idx == this.reviewIdx)[0]
        $('#review-name').val(searchData.title)

        $('#review-write-btn').click(this.reviewSave.bind(this))
    }

    reviewSave() {
        const name = $('#review-name').val()
        const date = $('#review-date').val()
        const score = $('#review-score').val()
        const content = $('#review-content').val()

        if(name == "" || date == "" || score == "" || content == "") {
            alert("유효성 검사 실패")
            return
        }

        this.reviewArr.push({
            name : name,
            date : date,
            score : score,
            content : content
        })

        this.reviewDraw()
        $('#place').fadeIn()
        $('#review').fadeOut()
    }

    reviewDraw() {
        $('#review-table tbody').html('')
        this.reviewArr.forEach(x=> {
            $('#review-table tbody').append(`
                <tr>
                    <td>${x.name}</td>
                    <td>${x.date}</td>
                    <td>${x.score}</td>
                    <td>${x.content}</td>
                </tr>
            `)
        })
    }

}

new Place()