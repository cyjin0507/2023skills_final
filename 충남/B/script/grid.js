const img = [
    '광덕산',
    '노은정',
    '독립기념관',
    '봉서산',
    '봉선홍경사갈기비',
    '성거산',
    '우정박물관',
    '위례산성',
    '유관순열사사적지',
    '이동녕선생기념관',
    '조병옥박사 생가',
    '조병옥박사생가',
    '천안박물관',
    '천안삼거리공원',
    '천흥사지5층석탑&당간지주',
    '태조산',
    '태학산자연휴양림',
    '흑성산'
]

class Grid {
    constructor() {
        // 기본적으로 그려줌
        this.init()
        this.basicList()
    }

    init() {
        this.imgs = img
        this.loc = this.loc
        this.deleteImgs = []
    }

    basicList() {
        $('.grid').html('')
        this.imgs.forEach((x,i)=> {
            $('.grid').append(`
                <div class="box">
                    <div class="box-inner">
                        <img src="./resources/image/여행갤러리/${x}.jpg" alt="" data-idx=${i}>
                        <div class="delete" data-idx=${i} data-name=${x}>x</div>
                    </div>
                </div>
            `)
        })

        this.addEvent()
        this.setPos()
    }

    addEvent() {
        $('.box img').click((e)=> {
            this.changeSizePos(e.target.dataset.idx)
        })

        $('.delete').click((e)=> {
            this.deletePos(e.target.dataset)
        })

    }

    setPos() {
        for(let i=0; i<img.length; i++) {
            $($('.box')[i]).css({
                'left' : this.loc(i).x + "px",
                'top' : this.loc(i).y + "px"
            })
            this.loc(i)
        }

    }

    loc(i) {
        let x = 150 * (i % 6)
        let y = Math.floor(i / 6) * 150
        return {x,y}
    }

    // 클릭해서 이미지 삭제
    deletePos(dataset) {
        let idx = dataset.idx
        let name = dataset.name
        let cnt = 0
        for(let i=0; i<img.length; i++) {
            if(i!=idx && $($('.box')[i]).css('display') != 'none') {
                $($('.box')[i]).css({
                    'left' : this.loc(cnt).x + "px",
                    'top' : this.loc(cnt).y + "px",
                })
            } else {
                cnt--
                $($('.box')[i]).css({
                    'display': 'none'
                })
            }
            cnt++
        }

        img.splice(img.indexOf(name),1)
        
        setTimeout(()=> {
            this.basicList()
        },600)
    }

    // 클릭해서 박스 사이즈 변할 때
    changeSizePos(idx) {
        $('.box').css({
            'width' : '150px',
            'height' : '150px'
        })
        $($('.box')[idx]).css({
            'width' : '300px',
            'height' : '300px'
        })

        let returnPos = [parseInt(idx)+1, parseInt(idx)+5, parseInt(idx)+6]

        let index = 0
        img.forEach((x,i)=> {
            let cnt = 0
            if(returnPos.includes(i)) {
                if(index == 1) {
                    cnt = 2
                    index += 2
                } else if(index < 1) {
                    cnt = 1
                    index++
                }
            }

            $($('.box')[i]).css('left', this.loc(i+index).x)
            $($('.box')[i]).css('top', this.loc(i+index).y)
        })

    }

}

new Grid()