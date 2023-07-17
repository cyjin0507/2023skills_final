class Slide {
    constructor(popular = []) {
        this.slideArr = []
        this.popular = popular.slice(0,3)

        this.popular.forEach(x=> {
            this.slideArr.push(x.idx)
        })

        clearInterval(this.slidePlay.bind(this))
        this.init()
    }

    async init() {
        this.data = await $.getJSON('./json/history.json')
        this.data = this.data.data
        this.randomSet()
    }

    randomSet() {
        let rndCnt = 3 - this.popular.length
        
        for(let i=0; i<rndCnt; i++) {
            let rnd = Math.floor(Math.random() * 8) + 1
            if(!this.slideArr.includes(rnd)) {
                this.slideArr.push(rnd)
            } else {
                i = i-1
            }
        }
        this.slideDraw()
    }

    slideDraw() {
        $('#slide-box').html('')

        this.slideArr.forEach((x,i)=> {
            $('#slide-box').append(`
                <div class="slide-item">
                    <img src="./img/0${parseInt(x)+1}.jpg" alt="">
                    <div class="slide-txt">
                        <p>${this.data[x].name}</p>
                        <p>${this.popular.length > i ? this.popular[i].score : 0}</p>
                    </div>
                </div>
            `)
        })

        this.slide = $('.slide-item')
        this.sno = 0
        this.eno = this.slide.length - 1
        
        setInterval(this.slidePlay.bind(this), 3000)

    }

    slidePlay() {
        $(this.slide[this.sno]).animate({
            left : "-100%"
        }, 1000, function() {
            $(this).css({left : "100%"})
        })

        this.sno++
    
        if(this.sno > this.eno) this.sno = 0
    
        $(this.slide[this.sno]).animate({
            left : "0%"
        },1000)
    }

}

new Slide()