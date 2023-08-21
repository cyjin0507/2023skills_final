class Detail extends Popup {
    constructor(app) {
        super('./detail.html')
        this.app = app
        this.data = this.app.getData

        this.review = []
    }
    
    async init(data) {
        this.current = this.data.find(x=> x.soapName == data.name)

        this.introduce()
    }

    addEvent() {
        dom(this.document, '#review-btn').click(this.reviewAdd.bind(this))
    }

    reviewAdd() {
        let val = dom(this.document, '#review-val').val()
        this.review.unshift({
            "idx" : this.review.length,
            "review" : val
        })

        dom(this.document, '#review-val').val('')
        this.drawReview()
    }

    drawReview() {
        dom(this.document, 'tbody').html('')
        this.review.forEach(x=> {
            dom(this.document, 'tbody').append(`
                <tr>
                    <td>${x.review}</td>
                    <td><button class="btn btn-danger review-delete" data-idx=${x.idx}>삭제</button></td>
                    <td><button class="btn btn-primary review-detail">더보기</button></td>
                </tr>
            `)
        })

        domAll(this.document, '.review-delete').click((e)=> {
            let idx = e.target.dataset.idx
            this.deleteReview(idx)
        })

    }

    deleteReview(idx) {
        this.review.splice(this.review.indexOf(this.review.find(x=>x.idx==idx)),1)

        this.drawReview()
    }

    introduce() {
        this.document.querySelector('.introduce').innerHTML = `
            이름 : ${this.current.soapName} <br>
            카테고리 : ${this.current.category} <br>
            제작사 : ${this.current.creator} <br>
            제작일 : ${this.current.release} <br>
            가격 : ${this.current.price}
        `
    }

}