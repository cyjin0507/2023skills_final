class Slide {
    constructor(popular = []) {
        this.popular = popular
        this.imgList = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg']
        this.init()
    }

    init() {
        this.randomSet()
    }

    randomSet() {
        let rndCnt = 3 - this.popular.length
        this.slideArr = []
        for(let i=0; i<rndCnt; i++) {
            let rnd = Math.floor(Math.random() * 9)
            if(!this.slideArr.includes(rnd)) {
                this.slideArr.push(this.imgList[rnd])
            } else {
                i = i-1
            }
        }

        this.slideDraw()
    }

    slideDraw() {
        $('#slide-box').html('')

        this.slideArr.forEach(x=> {
            $('#slide-box').append(`
                <div class="slide-item">
                    <img src="./img/${x}" alt="">
                    <div class="slide-txt">
                        <p>sdfsdfsdfds</p>
                        <p>erhnrelntlrentklretnkler</p>
                    </div>
                </div>
            `)
        })

    }

}

new Slide()