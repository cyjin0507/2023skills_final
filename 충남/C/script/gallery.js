
class Grid {
    constructor() {
        // 기본적으로 그려줌
        this.init()
    }

    async init() {
        const response = await $.getJSON('/gallery/get')

        this.imgs = response
        this.loc = this.loc
        this.basicList()
    }

    basicList() {
        $('.grid').html('')
        this.imgs.forEach((x,i)=> {
            $('.grid').append(`
                <div class="box">
                    <div class="box-inner">
                        <img src="/resources/image/gallery/${x.file}" alt="" data-idx=${i}>
                        <div class="delete" data-idx=${i} data-index=${x.idx} data-name="${x}">x</div>
                        <div class="download" data-index=${x.idx}>다운로드</div>
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

        $('.download').click((e)=> {
            this.download(e.target.dataset.index)
        })

    }

    setPos() {
        for(let i=0; i<this.imgs.length; i++) {
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
    async deletePos(dataset) {
        let idx = dataset.idx
        let name = dataset.name
        let cnt = 0
        for(let i=0; i<this.imgs.length; i++) {
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

    locCheck(i) {
        let type = 0

        if((i - 5) % 6 == 0 && Math.ceil(this.imgs.length / 6) == Math.floor(i / 6) + 1) {
            type = "end"
        } else if((i - 5) % 6 == 0) {
            type = "left"
        } else if(Math.ceil(this.imgs.length / 6) == Math.floor(i / 6) + 1) {
            type = "bottom"
        }

        
        return type
    }

    // 클릭해서 박스 사이즈 변할 때
    changeBigSizePos(idx) {
        $('.delete').css('display', 'block')
        $('.download').css('display', 'none')

        $($('.delete')[idx]).css('display', 'none')
        $($('.download')[idx]).css('display', 'block')

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
                        $($('.box')[index]).css('top', (Math.ceil(this.imgs.length / 6) -1) * 150)
                        $($('.box')[index]).css('left', this.loc(count+2).x)
                    } else if(this.locCheck(idx) == "end") {
                        $($('.box')[index]).css('top', (Math.ceil(this.imgs.length / 6) -1) * 150)
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
        $($('.delete')[idx]).css('display', 'block')
        $($('.download')[idx]).css('display', 'none')

        $($('.box')[idx]).css({
            'width' : '150px',
            'height' : '150px',
            'margin-left' : '0',
            'margin-top' : '0',
        })
        
        this.imgs.forEach((x, i)=> {
            $($('.box')[i]).css({
                'left' : this.loc(i).x + "px",
                'top' : this.loc(i).y + "px",
            })
        })
    }

    async download(idx) {
        const response = await $.ajax({
            url : "/gallery/download",
            type : "POST",
            data : JSON.stringify({
                "idx" : idx
            })
        })

        const json = JSON.parse(response)

        const link = document.createElement("a")
        link.href = `/resources/image/nocrop/${json.file}`
        link.download = json.name
        link.click()

    }

}

new Grid()