class Slide {
    constructor() {
        // 예비 슬라이드 리스트
        this.slideReserveList = []
        // 실제 구동될 슬라이드 리스트
        this.slideList = []

        this.isSlideMove = false
        this.isPagerMove = false

        // 좌우버튼
        this.option1 = false
        // 페이져
        this.option2 = false
        // 무한슬라이드
        this.option3 = false

        this.init()
    }

    init() {
        this.addEvent()
    }

    addEvent() {
        $('#slide-img-input').change((e) => {
            this.imgData = e
        })

        $('#slide-add-btn').click(this.slideAdd.bind(this))

        $('#slide-img-list').click((e)=> {
            this.slideSelect(e)
        })

        $('#option1-btn').click((e)=> {
            this.option1 = !this.option1
            if(this.option1) {
                $('#slide-move').fadeIn()
            } else {
                $('#slide-move').fadeOut()
            }
        })

        $('#option2-btn').click((e)=> {
            this.option2 = !this.option2
            if(this.option2) {
                $('#slide-pager').fadeIn()
            } else {
                $('#slide-pager').fadeOut()
            }
        })

        $('#option3-btn').click((e)=> {
            this.option3 = !this.option3
            clearInterval(this.slideInterval)
            this.slideInterval = setInterval(this.slideCarouselPlay.bind(this), 3000)
        })


        this.movePage()
        this.pager()
    }

    // 페이져 이벤트
    pager() {

        $('#slide-pager').on('mousedown', (e)=> {
            this.isPagerMove = true
        })

        $('body').on('mouseup', (e)=> {
            this.isPagerMove = false
        })

        let domLoc = document.querySelector('#slide-box').getBoundingClientRect()

        $('#slide-box').on('mousemove', (e)=> {
            if(!this.isPagerMove) {return}
            e.preventDefault()
            this.pagerX = e.pageX - domLoc.x
            this.pagerY = e.pageY - domLoc.y

            if(this.pagerX < 0 || this.pagerY < 0) {return}
            if(this.pagerX > 1080 || this.pagerY > 290) {return}

            $('#slide-pager').css({
                "left" : this.pagerX,
                "top" : this.pagerY,
            })
        })
    }
 
    // 좌우버튼 이벤트
    movePage() {
        $('#slide-move').on('mousedown', (e)=> {
            this.isSlideMove = true
        })

        $('body').on('mouseup', (e)=> {
            this.isSlideMove = false
        })

        let domLoc = document.querySelector('#slide-box').getBoundingClientRect()

        $('#slide-box').on('mousemove', (e)=> {
            if(!this.isSlideMove) {return}
            e.preventDefault()

            this.moveX = Math.abs(e.pageX - domLoc.x)
            this.moveY = Math.abs(e.pageY - domLoc.y)

            if(this.moveX < 0 || this.moveY < 0) {return}
            if(this.moveX > 1012 || this.moveY > 290) {return}

            $('#slide-move').css({
                "left" : this.moveX,
                "top" : this.moveY,
            })
        })

        $('#left-btn').click(()=> {
            this.slideMoveClick("left")
        })
        $('#right-btn').click(()=> {
            this.slideMoveClick("right")
        })

    }

    slideSelect(e) {
        if(e.target.dataset.idx == undefined) {return}
        let idx = e.target.dataset.idx

        if(!this.slideList.find(x=>x==idx)) {
            $(`#slide-img-list > div[data-idx=${idx}]`).css('border', '1px solid green')
            this.slideList.push(idx)
        } else {
            $(`#slide-img-list > div[data-idx=${idx}]`).css('border', '1px solid white')
            this.slideList.forEach((x,i)=> {
                if(x==idx) {
                    this.slideList.splice(i,1)
                }
            })
        }

        this.slideDraw()
    }

    slideDraw() {
        $('#slide-play-box').html('')
        this.slideList.forEach(x=> {
            let data = this.slideReserveList[x-1]
            $('#slide-play-box').append(`
                <div class="slide-area">
                    <div>
                        <img src="${data.image}" alt="">
                        <div class="slide-txt">
                            <h3>${data.title}</h3>
                            <h5>${data.subTitle}</h5>
                        </div>
                    </div>
                </div>
            `)
        })
        this.slideLength = $('.slide-area').length
        this.pagerSet()
        this.carousel()
    }

    pagerSet() {
        $('#slide-pager').html('')

        for(let i=1; i<=this.slideLength; i++) {
            $('#slide-pager').append(`
                <button class="btn btn-primary" data-idx=${i}>${i}</button>
            `)
        }

        $('#slide-pager > button').click((e)=> {
            clearInterval(this.slideInterval)
            // 나중에 여기 수정
            animation($('.slide-area')[this.index], 1, 'left', '-100%')
            animation($('.slide-area')[e.target.dataset.idx - 1], 1, 'left', '0%')
            this.index = e.target.dataset.idx - 1
            this.slideInterval = setInterval(this.slideCarouselPlay.bind(this), 3000)        
        })

    }

    carousel() {
        clearInterval(this.slideInterval)

        let loc = 0

        for(let i=0; i<this.slideLength; i++) {
            loc = i==0 ? 0 : 100
            $($('.slide-area')[i]).css('left', `${loc}%`)
        }

        this.index = 0

        if(this.slideLength <= 1) {return}
        
        this.slideInterval = setInterval(this.slideCarouselPlay.bind(this), 3000)
    }

    slideCarouselPlay(
        current = this.index,
        next = this.index + 1 < this.slideLength ? this.index + 1 : 0
    ) {
        if(!this.option3 && this.index == this.slideLength-1) {return}

        const currentSlide = $('.slide-area')[current]
        // 애니메이션
        animation(currentSlide, 1, 'left', '-100%', ()=> {
            animation(currentSlide, 0, 'left', '100%')
        })

        this.index = next
        const nextSlide = $('.slide-area')[next]
        // 애니메이션
       animation(nextSlide, 1, 'left', '0%')

    }

    slideMoveClick(type) {
        if(this.slideLength <= 1) {return}

        let current = 0
        clearInterval(this.slideInterval)

        if(type == "left") {
            // 슬라이드 다음게 나옴 (오->왼)
            current = this.index + 1 < this.slideLength ? this.index + 1 : 0
            animation($('.slide-area')[this.index], 1, 'left', '-100%')
            $('.slide-area').css('left', '100%')
            animation($('.slide-area')[current], 1, 'left', '0%')
        } else if(type == "right") {
            // 슬라이드 이전게 나옴 (왼->오)
            current = this.index - 1 > 0 ? this.index - 1 : this.slideLength - 1
            animation($('.slide-area')[this.index], 1, 'left', '100%')
            $('.slide-area').css('left', '-100%')
            animation($('.slide-area')[current], 1, 'left', '0%')
        }

        this.index = current
        this.slideInterval = setInterval(this.slideCarouselPlay.bind(this), 3000)
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