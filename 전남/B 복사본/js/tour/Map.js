const data = [
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
        this.HEIGHT = 850

        this.tooltip = document.querySelector('.tooltipEl')
        this.canvas = document.querySelector('#map-canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT

        this.init()
    }

    init() {
        this.pathList = data.map(({x,y})=> {
            const path = new Path2D()
            path.arc(x,y,10,0,Math.PI*2)
            return path
        })

        this.history = []
        this.hoverIdx = -1
        this.selectIdx = -1

        this.addEvent()
        this.drawing()
    }

    addEvent() {
        this.canvas.addEventListener('mousemove', this.drawing.bind(this))
        this.canvas.addEventListener('mousedown', this.onmousedown.bind(this))
        this.canvas.addEventListener('mouseup', this.onmouseup.bind(this))

        document.querySelector('#reset').addEventListener('click', this.reset.bind(this))
        document.querySelector('#undo').addEventListener('click', this.undo.bind(this))
        document.querySelector('#download').addEventListener('click', this.download.bind(this))
    }

    drawing({offsetX, offsetY} = {}) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

        this.tooltip.style.display = 'none'
        this.canvas.style.cursor = 'default'

        this.hoverIdx = -1

        this.ctx.lineWidth = 3
        this.ctx.fillStyle = '#ff8181'

        for(let i=0; i<this.history.length-1; i++) {
            const {x:prevX, y:prevY} = data[this.history[i]]
            const {x:nextX, y:nextY} = data[this.history[i+1]]

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            this.ctx.lineTo(nextX, nextY)
            this.ctx.stroke()
            this.ctx.closePath()
        }

        if(this.selectIdx > -1) {
            const {x:prevX, y:prevY} = data[this.selectIdx]
            const findIdx = this.pathList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            if(findIdx > -1) {
                this.ctx.lineTo(data[findIdx].x, data[findIdx].y)
            } else {
                this.ctx.lineTo(offsetX, offsetY)
            }
            this.ctx.stroke()
            this.ctx.closePath()
        }

        for(const index in this.pathList) {
            const path = this.pathList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                this.hoverIdx = index
            }
            this.ctx.fillStyle = this.hoverIdx == index ? 'yellow' : '#ff8181'
            this.ctx.fill(path)
        }

        for(const index in this.history) {
            const {x,y} = data[this.history[index]]
            this.ctx.textAlign = 'center'
            this.ctx.font = '14px Arial'
            this.ctx.textBaseline = 'middle'

            this.ctx.beginPath()
            this.ctx.fillStyle = 'white'
            this.ctx.fillText(`${Number(index)+1}`, x, y)
            this.ctx.closePath()
        }

        if(this.hoverIdx > -1) {
            const {x,y,name,image} = data[this.hoverIdx]

            this.tooltip.style.display = 'block'
            this.tooltip.style.left = `${x + 10}px`
            this.tooltip.style.top = `${y + 10}px`
            this.tooltip.querySelector('.name').innerText = name
            this.tooltip.querySelector('img').src = image

            this.canvas.style.cursor = 'pointer'
        }

    }

    onmousedown({offsetX, offsetY}) {
        if(this.history.length == data.length) {
            alert("경로설정을 마쳤습니다. 수정하고 싶으면 되돌리거나 초기화 하십시오.")
            return
        }

        const findIdx = this.pathList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))
        this.selectIdx = findIdx

        if(findIdx > -1) {
            if(this.history.length != 0 &&
                this.history[this.history.length-1] != this.selectIdx) {
                alert("이미 설정된 경로입니다.")
                this.selectIdx = -1
            }
        }
    }

    onmouseup({offsetX, offsetY}) {
        const findIdx = this.pathList.findIndex(path=>this.ctx.isPointInPath(path, offsetX, offsetY))

        if(findIdx == this.selectIdx) {
            this.selectIdx = -1
            return
        }

        if(this.history.includes(findIdx)) {
            alert("이미 설정된 경로입니다.")
            this.selectIdx = -1
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
        if(this.history < 1) {
            alert("먼저 경로 설정을 해주세요.")
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
        
        newCtx.drawImage(image,0,0)
        const pathImage = new Image()
        pathImage.onload = () => {
            newCtx.drawImage(pathImage,0,0)
            const a = document.createElement('a')
            a.href = newCanvas.toDataURL()
            a.download = 'route.png'
            a.click()
        }

        pathImage.src = this.canvas.toDataURL()
    }

    reset() {
        if(this.history.length < 1) {
            alert("더 이상 진행 할 수 없습니다.")
            return
        }

        this.history = []
        this.drawing()
    }
    
    undo() {
        if(this.history.length < 1) {
            alert("더 이상 진행 할 수 없습니다.")
            return
        }

        this.history.splice(-1,1)
        this.drawing()
    }

}