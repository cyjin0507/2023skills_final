class Detail extends Popup {
    constructor(app) {
        super('./detail.html')
        this.app = app
        this.data = this.app.getData

        this.review = []
    }
    
    async init(data) {
        this.produceName = data.name

        this.cuurent = this.data.filter(x=> x.soapName == this.produceName)

        this.introduce()
    }

    addEvent() {
        dom(this.document, '#review-btn').click(this.reviewAdd.bind(this))
    }

    reviewAdd() {
        let val = dom(this.document, '#review-val').val()
        this.review.push({
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

        domAll(this.document, '.review-detail').click(()=> {
            new Comment(this).open()
        })

    }

    deleteReview(idx) {
        this.review.forEach((x,i)=> {
            if(x.idx == idx) {
                this.review.splice(i,1)
            }
        })

        this.drawReview()
    }

    introduce() {
        this.document.querySelector('.introduce').innerHTML = `
            이름 : ${this.cuurent[0].soapName} <br>
            카테고리 : ${this.cuurent[0].category} <br>
            제작사 : ${this.cuurent[0].creator} <br>
            제작일 : ${this.cuurent[0].release} <br>
            가격 : ${this.cuurent[0].price}
        `
    }

}