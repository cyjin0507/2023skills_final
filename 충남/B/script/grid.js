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
                        <div class="delete" data-idx=${i} data-name="${x}">x ${i}</div>
                    </div>
                </div>
            `)
        })

        this.addEvent()
        this.setPos()
    }

    addEvent() {
        $('.box img').click((e)=> {
            if($($('.box')[e.target.dataset.idx]).css('width') == '300px') {
                this.changeSmallSizePos(e.target.dataset.idx)
            } else {
                this.changeBigSizePos(e.target.dataset.idx)
            }
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

    locCheck(i) {
        let type = 0

        if((i - 5) % 6 == 0 && Math.ceil(img.length / 6) == Math.floor(i / 6) + 1) {
            type = "end"
        } else if((i - 5) % 6 == 0) {
            type = "left"
        } else if(Math.ceil(img.length / 6) == Math.floor(i / 6) + 1) {
            type = "bottom"
        }

        
        return type
    }

    // 클릭해서 박스 사이즈 변할 때
    changeBigSizePos(idx) {
        $('.box').css({
            'width' : '150px',
            'height' : '150px',
            'margin-left' : '0',
            'margin-top' : '0'
        })

        $($('.box')[idx]).css({
            'width' : '300px',
            'height' : '300px'
        })

        let returnPos = [parseInt(idx)+1, parseInt(idx)+6, parseInt(idx)+7]

        if(this.locCheck(idx) == "left") {
            $($('.box')[idx]).css({
                'margin-left' : '-150px'
            })

            returnPos = [parseInt(idx)-1, parseInt(idx), parseInt(idx)+5, parseInt(idx)+6]
        }

        if(this.locCheck(idx) == "bottom") {
            $($('.box')[idx]).css({
                'margin-top' : '-150px'
            })

            returnPos = [parseInt(idx)-6, parseInt(idx)-5, parseInt(idx), parseInt(idx)+1]
        }

        if(this.locCheck(idx) == "end") {
            $($('.box')[idx]).css({
                'margin-top' : '-150px',
                'margin-left' : '-150px'
            })

            returnPos = [parseInt(idx)-7, parseInt(idx)-6, parseInt(idx), parseInt(idx)-1]
        }

        let index = 0
        let count = 0
        
        while(index < this.imgs.length) {
            if(returnPos.includes(count)) {
                index--
            } else {
                if(this.locCheck(idx) != 0 && index == idx) {
                    if(this.locCheck(idx) == "left") {
                        $($('.box')[index]).css('top', this.loc(count).y - 150)
                        $($('.box')[index]).css('left', '750px')
                    } else if(this.locCheck(idx) == "bottom") {
                        $($('.box')[index]).css('top', (Math.ceil(img.length / 6) -1) * 150)
                        $($('.box')[index]).css('left', this.loc(count+2).x)
                    } else if(this.locCheck(idx) == "end") {
                        $($('.box')[index]).css('top', (Math.ceil(img.length / 6) -1) * 150)
                        $($('.box')[index]).css('left', '750px')
                    }
                    count--
                } else {
                        $($('.box')[index]).css('left', this.loc(count).x)
                        $($('.box')[index]).css('top', this.loc(count).y)
                }
                
            }
            count++
            index++
        }

    }

    changeSmallSizePos(idx) {
        $($('.box')[idx]).css({
            'width' : '150px',
            'height' : '150px',
            'margin-left' : '0',
            'margin-top' : '0',
        })
        
        img.forEach((x, i)=> {
            $($('.box')[i]).css({
                'left' : this.loc(i).x + "px",
                'top' : this.loc(i).y + "px",
            })
        })
    }

}

new Grid()