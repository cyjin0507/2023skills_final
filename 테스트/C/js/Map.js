export default class Map {
    constructor() {
        this.WIDTH = 800
        this.HEIGHT = 800

        this.tooltip = document.querySelector('#tooltip')
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT

        this.init()
    }

    init() {
        this.pointList = datas.forEach(({x,y})=> {
            const path = new Path2D()
            path.arc(x,y,10,0,Math.PI*2)
            return path
        })

        this.history = []
        this.selectIdx = -1
        this.hoverIdx = -1

        this.addEvent()
        this.drawing()
    }

    addEvent() {
        this.canvas.addEventListener('mousemove', this.drawing.bind(this))
        this.canvas.addEventListener('mousedown', this.onmousedown.bind(this))
        this.canvas.addEventListener('mouseup', this.onmouseup.bind(this))

        document.querySelector('#reset').addEventListener('click', this.reset.bind(this))
        document.querySelector('#download').addEventListener('click', this.download.bind(this))
        document.querySelector('#undo').addEventListener('click', this.undo.bind(this))

        document.querySelector('#guide-btn').addEventListener('click', this.guide.bind(this))
    }

    drawing({offsetX, offsetY}) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
        this.tooltip.style.display = 'none'
        this.canvas.style.cursor = 'default'

        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = 'red'

        for(let i=0; i<this.history.length; i++) {
            const {x: prevX, y: prevY} = datas[this.history[i]]
            const {x: nextX, y: nextY} = datas[this.history[i+1]]

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            this.ctx.lineTo(nextX, nextY)
            this.ctx.stroke()
            this.ctx.closePath()
        }

        if(this.selectIdx > -1) {
            const {x: prevX, y: prevY} = datas[this.selectIdx]
            const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            if(findIdx > -1) {
                this.ctx.lineTo(datas[findIdx].x, datas[findIdx].y)
            } else {
                this.ctx.lineTo(offsetX, offsetY)
            }
            this.ctx.stroke()
            this.ctx.closePath()
        }

        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                this.hoverIdx = index
            }
            this.ctx.fillStyle = this.hoverIdx == index ? 'yellow' : 'red'
        }

        for(const index in this.history) {
            const {x,y} = datas[this.history[index]]
            this.ctx.beginPath()
            this.ctx.font = '14px Arial'
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = 'white'
            this.ctx.fillText(`${Number(index) + 1}`, x, y)
            this.ctx.closePath()
        }

        if(this.hoverIdx > -1) {
            const {x,y,name,image} = datas[this.hoverIdx]

            this.tooltip.style.display = 'block'
            this.tooltip.style.left = `${x + 10}px`
            this.tooltip.style.top = `${y + 10}px`

            this.tooltip.querySelector('.name').innerText = name
            this.tooltip.querySelector('img').src = image
        
            this.canvas.style.cursor = 'pointer'
        }
    }

    onmousedown({offsetX, offsetY}) {
        if(this.history.length == 8) {
            alert("이미 끝남")
        }

        const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))
        this.selectIdx = findIdx

        if(findIdx > -1) {
            if(this.history.length != 0 && this.history[findIdx-1]!=findIdx) {
                alert("오류1")
            }
        }
    }

    onmouseup({offsetX, offsetY}) {
        const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))
        if(findIdx == this.selectIdx) {
            this.selectIdx = -1
            return
        }

        if(this.history.includes(findIdx)) {
            this.selectIdx = -1
            alert("오류2")
            return
        }

        if(findIdx > -1) {
            if(!this.history.length) {
                this.history.push(this.selectIdx)
            }
            this.history.push(findIdx)
        }

        this.selectIdx = -1
    }

    download() {
        if(this.history.length < 1) {
            alert("다운불가")
            return
        }

        const newCanvas = document.createElement('canvas')
        const newCtx = newCanvas.getContext('2d')
        newCanvas.width = this.WIDTH
        newCanvas.height = this.HEIGHT
        const image = document.querySelector('#map > img')

        newCtx.beginPath()
        newCtx.fillStyle = 'black'
        newCtx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        newCtx.closePath()

        newCtx.drawImage(image, 0,0)

        const pathImage = new Image()
        pathImage.onload = () => {
            newCtx.drawImage(pathImage, 0,0)
            const a = document.createElement('a')
            a.href = newCanvas.toDataURL()
            a.download = 'map.png'
            a.click()
        }

        pathImage.src = this.canvas.toDataURL()
    }

    undo() {
        if(this.history.length < 1) {
            alert("불가")
            return
        }
        this.history.splice(-1,1)
        this.drawing()
    }

    reset() {
        if(this.history.length < 1) {
            alert("불가")
            return
        }
        this.history = []
        this.drawing()
    }

    async guide() {
        if(this.history.length != 8) {
            alert("투어경로 설정을 끝내주세요.")
            return
        }

        const list = await $.getJSON(`/guide/list`)

        $('#guide-list tbody').html('')
        list.forEach(x=> {
            $('#guide-list tbody').append(`
                <tr>
                    <td>${x.name} ${x.accept == 1 ? '<span style="color:red">추천</span>' : ''}</td>
                    <td>${x.avg ? x.avg : 0}</td>
                    <td><<button class='request-btn btn btn-primary' data-idx=${x.idx}>요청</button></td>
                </tr>
            `)
        })

        $('.request-btn').click(this.requestFunc.bind(this))
    }

    async requestFunc(e) {
        let gidx = e.target.dataset.idx

        const check = await $.getJSON(`/process/guide/${gidx}`)
        if(check.state) {
            const response = await $.ajax({
                url : '/request/tour',
                method : 'POST',
                data : JSON.stringify({
                    gidx : gidx,
                    course : JSON.stringify(this.history)
                })
            })
            alert(response.message)
        } else {
            alert(check.message)
        }
    }

}