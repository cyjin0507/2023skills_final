class Slide {
    constructor() {
        // 예비 슬라이드 리스트
        this.slideReserveList = []
        // 실제 구동될 슬라이드 리스트
        this.slideList = []

        this.init()
    }

    init() {
        this.slideAddEvent()
    }

    slideAddEvent() {
        $('#slide-img-input').change((e) => {
            this.imgData = e
        })

        $('#slide-add-btn').click(this.slideAdd.bind(this))

        $('#slide-img-list').click((e)=> {
            this.slideSelect(e)
        })

    }

    slideSelect(e) {
        if(e.target.dataset.idx == undefined) {return}
        let idx = e.target.dataset.idx

        if(!this.slideList.find(x=>x==idx)) {
            $(`#slide-img-list > div[data-idx=${idx}]`).css('background-color', '#aaa')
            this.slideList.push(idx)
        } else {
            $(`#slide-img-list > div[data-idx=${idx}]`).css('background-color', 'white')
        }
    }
    

    slideAdd() {
        if(this.imgData == undefined) {
            alert("이미지를 선택해주세요.")
            return
        }


        let title = $('#main-title').val()
        let subTitle = $('#sub-title').val()

        if(title=="" || subTitle=="") {
            alert("제목 및 부제목을 입력해주세요.")
            return
        }

        getImageFiles(this.imgData)
        

        setTimeout(()=> {
            if(!url) {return}
            this.slideReserveList.push({
                "idx" : this.slideReserveList.length + 1,
                "image" : url,
                "title" : title,
                "subTitle" : subTitle
            })

            this.drawSlideList()

        },100)

    }

    drawSlideList() {
        $('#slide-img-list').html('')

        this.slideReserveList.forEach(x=> {
            $('#slide-img-list').append(`
                <div data-idx=${x.idx}>
                    <img src="${x.image}" data-idx=${x.idx} alt="">
                    <p data-idx=${x.idx}>${x.title}</p>
                    <p data-idx=${x.idx}>${x.subTitle}</p>
                </div>
            `)
        })

    }

}

new Slide()