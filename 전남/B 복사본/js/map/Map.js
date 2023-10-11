const datas = [
    {name:"독립기념관", image:"/image/명소/image1.jpg", x:385, y:482},
    {name:"유관순열사 사적지", image:"/image/명소/image2.jpg", x:570, y:505},
    {name:"천안 삼거리 공원", image:"/image/명소/image3.jpg", x:280, y:430},
    {name:"태조산 왕건길과 청동대좌불", image:"/image/명소/image4.jpg", x:355, y:331},
    {name:"아라리오 조각광장", image:"/image/명소/image5.jpg", x:275, y:331},
    {name:"성성호수공원", image:"/image/명소/image6.jpg", x:260, y:264},
    {name:"광덕산", image:"/image/명소/image7.jpg", x:68, y:658},
    {name:"국보 봉선 홍경사 갈기비", image:"/image/명소/image8.jpg", x:230, y:68},
]

export default class Map {
    constructor() {
        this.WIDTH = 800
        this.HEIGHT = 800

        this.tooltip = document.querySelector('.tooltipEl')
        this.canvas = document.querySelector('#map-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT

        this.init()
    }

    init() {
        this.pointList = datas.map(({x,y})=> {
            const path = new Path2D()
            path.arc(x,y,10,0,Math.PI*2)
            return path
        })

        this.history = []
        this.selectIdx = -1
        this.hoverIdx = -1

        this.drawing()
        this.addEvent()
    }

    addEvent() {
        this.ctx.canvas.addEventListener('mousemove', this.drawing.bind(this))
        this.ctx.canvas.addEventListener('mousedown', this.onmousedown.bind(this))
        this.ctx.canvas.addEventListener('mouseup', this.onmouseup.bind(this))

        document.querySelector('#reset').addEventListener('click', this.reset.bind(this))
        document.querySelector('#undo').addEventListener('click', this.undo.bind(this))
        document.querySelector('#download').addEventListener('click', this.download.bind(this))
    }

    drawing({offsetX, offsetY} = {}) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
        this.tooltip.style.display = 'none'
        this.ctx.canvas.style.cursor = 'default'

        this.hoverIdx = -1

        this.ctx.lineWidth = 3
        this.ctx.fillStyle = 'red'

        for(let i=0; i<this.history.length-1; i++) {
            this.ctx.beginPath()
            const {x:prevX, y:prevY} = datas[this.history[i]]
            const {x:nextX, y:nextY} = datas[this.history[i+1]]

            this.ctx.moveTo(prevX, prevY)
            this.ctx.lineTo(nextX, nextY)
            this.ctx.stroke()
            this.ctx.closePath()
        }

        if(this.selectIdx > -1) {
            const {x:prevX, y:prevY} = datas[this.selectIdx]
            const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            if(findIdx > -1) {
                this.ctx.lineTo(datas[findIdx].x,datas[findIdx].y)
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
            this.ctx.fill(path)
        }

        for(const index in this.history) {
            const {x,y} = datas[this.history[index]]
            this.ctx.font = '14px Arial'
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = 'white'

            this.ctx.beginPath()
            this.ctx.fillText(`${Number(index)+1}`, x, y)
            this.ctx.closePath()
        }

        if(this.hoverIdx > -1) {
            const {x,y,image,name} = datas[this.hoverIdx]

            this.tooltip.style.display = 'block'
            this.tooltip.style.left = `${x+10}px`
            this.tooltip.style.top = `${y+10}px`
            this.tooltip.querySelector('.name').innerText = name
            this.tooltip.querySelector('img').src = image

            this.canvas.style.cursor = 'cursor'
        }

    }

    onmousedown({offsetX, offsetY}) {
        if(this.history.length >= 8) {
            alert("이미 다 끝남")
            return
        }

        const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))
        this.selectIdx = findIdx

        if(findIdx > -1) {
            if(this.history.length != 0 && this.history[this.history.length-1] != this.selectIdx) {
                alert("오류 1")
                this.selectIdx = -1
                return
            }
        }
    }

    onmouseup({offsetX, offsetY}) {
        const findIdx = this.pointList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))
        
        if(this.selectIdx == findIdx) {
            this.selectIdx = -1
            return
        }

        if(this.history.includes(findIdx)) {
            alert("오류 2")
            this.selectIdx = -1
            return
        }

        if(findIdx > -1) {
            if(!this.history.length) {
                this.history.push(this.selectIdx)
            }
            this.history.push(findIdx)
        }

        console.log(this.history);

        this.selectIdx = -1
    }

    download() {
        if(this.history.length < 1) {
            alert("다운불가")
            return
        }

        const canvas = document.querySelector('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = this.WIDTH
        canvas.height = this.HEIGHT

        const pathImage = document.querySelector("#map > img")
        
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        ctx.drawImage(pathImage,0,0)
        ctx.closePath()

        const image = new Image()
        image.onload = () => {
            ctx.drawImage(image,0,0)
            const a = document.createElement('a')
            a.href = canvas.toDataURL('image/jpg')
            a.download = "map.png"
            a.click()
        }
        image.src = this.canvas.toDataURL('image/jpg')

    }

    reset() {
        if(this.history.length < 1) {
            alert("더이상 진행불가")
            return
        }

        this.history = []
        this.drawing()
    }

    undo() {
        if(this.history.length < 1) {
            alert("더이상 진행불가")
            return
        }

        this.history.splice(-1,1)
        this.drawing()
    }
}