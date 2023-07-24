const loc = [
    {
        "x" : 0,
        "y" : 0,
    },
    {
        "x" : 150,
        "y" : 0,
    },
    {
        "x" : 300,
        "y" : 0,
    },
    {
        "x" : 450,
        "y" : 0,
    },
    {
        "x" : 600,
        "y" : 0,
    },
    {
        "x" : 750,
        "y" : 0,
    },
    {
        "x" : 0,
        "y" : 150,
    },
    {
        "x" : 150,
        "y" : 150,
    },
    {
        "x" : 300,
        "y" : 150,
    },
    {
        "x" : 450,
        "y" : 150,
    },
    {
        "x" : 600,
        "y" : 150,
    },
    {
        "x" : 750,
        "y" : 150,
    },
    {
        "x" : 0,
        "y" : 300,
    },
    {
        "x" : 150,
        "y" : 300,
    },
    {
        "x" : 300,
        "y" : 300,
    },
    {
        "x" : 450,
        "y" : 300,
    },
    {
        "x" : 600,
        "y" : 300,
    },
    {
        "x" : 750,
        "y" : 300,
    },
    {
        "x" : 0,
        "y" : 450,
    },
    {
        "x" : 150,
        "y" : 450,
    },
    {
        "x" : 300,
        "y" : 450,
    },
    {
        "x" : 450,
        "y" : 450,
    },
    {
        "x" : 600,
        "y" : 450,
    },
    {
        "x" : 750,
        "y" : 450,
    },
]

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


    }

    async init() {
        const response = await $.getJSON('/gallery/get')


        this.imgs = response
        this.loc = this.loc
        this.deleteImgs = []
        this.basicList()
    }

    basicList() {
        $('.grid').html('')
        this.imgs.forEach((x,i)=> {
            $('.grid').append(`
                <div class="box">
                    <div class="box-inner">
                        <img src="/resources/image/gallery/${x.file}" alt="" data-idx=${i}>
                        <div class="delete" data-idx=${i} data-index=${x.idx} data-name=${x.file}>x</div>
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

        // $('#img-add-btn').click(this.imgAdd.bind(this))

    }

    setPos() {
        for(let i=0; i<this.imgs.length; i++) {
            $($('.box')[i]).css({
                'left' : loc[i].x + "px",
                'top' : loc[i].y + "px"
            })
        }

    }

    // 클릭해서 이미지 삭제
    async deletePos(dataset) {
        let idx = dataset.idx
        let cnt = 0
        for(let i=0; i<this.imgs.length; i++) {
            if(i!=idx && $($('.box')[i]).css('display') != 'none') {
                $($('.box')[i]).css({
                    'left' : loc[cnt].x + "px",
                    'top' : loc[cnt].y + "px",
                })
            } else {
                cnt--
                $($('.box')[i]).css({
                    'display': 'none'
                })
            }
            cnt++
        }

        const response = await $.ajax({
            url : "/gallery/delete",
            type : "POST",
            data : JSON.stringify({
                "idx" : dataset.index
            })
        })

        setTimeout(()=> {
            this.init()
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

            $($('.box')[i]).css('left', loc[i+index].x)
            $($('.box')[i]).css('top', loc[i+index].y)
        })

    }



}

new Grid()