class Place {
    constructor() {
        this.init()
        this.reviewIdx = -1
        setInterval(()=> {
            this.init()
        },5000)
    }

    async init() {
        const data = await $.ajax({
            url : "/place/get/data",
            dataType : "json",
            cache : false,
        })
        this.data = data

        this.drawList()
        this.addEvent()

        this.reviewDraw()
    }

    drawList() {
        $('#place-table tbody').html('')
        this.data.forEach(async x=> {
            const {avg} = await $.getJSON(`/review/score/count/${x.idx}`)
            const {cnt} = await $.getJSON(`/review/count/${x.idx}`)

            $('#place-table tbody').append(`
                <tr>
                    <td><img src="/resources/imgs/place/${x.idx}.jpg" alt=""></td>
                    <td>${x.title}</td>
                    <td>${avg==null ? 0 : Math.round(avg * 10) / 10}</td>
                    <td>${cnt==null ? 0 : cnt}</td>
                    <td>${x.distance}</td>
                    <td><button data-idx=${x.idx} class="btn btn-primary review-btn">리뷰 작성</button></td>
                </tr>
            `)
        })
    }

    addEvent() {
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

    async reviewSave() {
        const name = $('#review-name').val()
        const date = $('#review-date').val()
        const score = $('#review-score').val()
        const content = $('#review-content').val()

        if(name == "" || date == "" || score == "" || content == "") {
            alert("유효성 검사 실패")
            return
        }

        console.log(this.reviewIdx);
        const response = await $.ajax({
            url : "/review/add",
            type : "POST",
            data : JSON.stringify({
                "idx" : this.reviewIdx,name,date,score,content
            })
        })

        this.reviewDraw()
        $('#place').fadeIn()
        $('#review').fadeOut()
    }

    async reviewDraw() {
        const reviewData = await $.ajax({
            url : "/review/get/data",
            dataType : "json",
            cache : false,
        })
    
        $('#review-table tbody').html('')

        reviewData.forEach(x=> {
            $('#review-table tbody').append(`
                <tr>
                    <td>${x.title}</td>
                    <td>${x.date}</td>
                    <td>${x.score}</td>
                    <td>${x.content}</td>
                </tr>
            `)
        })
    }

}

new Place()