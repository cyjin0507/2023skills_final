const datas = [
    { name: "1경(독립기념관)", image: '/image/img1.jpg', x: 385, y: 482 },
    { name: "2경(유관순열사 사적지)", image: '/image/img2.jpg', x: 570, y: 505 },
    { name: "3경(천안 삼거리 공원)", image: '/image/img3.jpg', x: 280, y: 430 },
    { name: "4경(태조산 왕건길과 청동대좌불)", image: '/image/img4.jpg', x: 355, y: 331 },
    { name: "5경(아라리오 조각광장)", image: '/image/img5.jpg', x: 275, y: 331 },
    { name: "6경(성성호수공원)", image: '/image/img6.jpg', x: 260, y: 264 },
    { name: "7경(광덕산)", image: '/image/img7.jpg', x: 68, y: 658 },
    { name: "8경(국보 봉선 홍경사 갈기비)", image: '/image/img8.jpg', x: 230, y: 68 },
]

class Map {
    constructor() {
        this.WIDTH = 800
        this.HEIGHT = 800

        this.tooltipEl = document.querySelector('.tooltip')
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT

        this.init()
    }

    init() {
        this.pathList = datas.map(({x,y}) => {
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
        document.addEventListener('mouseup', this.onMouseup.bind(this))
        document.querySelector('#reset').addEventListener('click', this.reset.bind(this))
        document.querySelector('#undo').addEventListener('click', this.undo.bind(this))
        document.querySelector('#download').addEventListener('click', this.downloadImage.bind(this))
    }

    drawing({offsetX, offsetY} = {}) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

        this.hoverIdx = -1
        this.tooltipEl.style.display = 'none'
        this.canvas.style.cursor = 'default'

        // 이미 그린 선들을 그려줌
        for(let i=0; i<this.history.length - 1; i++) {
            const {x:prevX, y:prevY} = datas[this.history[i]]
            const {x:nextX, y:nextY} = datas[this.history[i+1]]

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            this.ctx.lineTo(nextX, nextY)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        // 드래그 할때 선 그려줌
        if(this.selectIdx > -1) {
            const { x: prevX, y: prevY } = datas[this.selectIdx]
            const findIdx = this.pathList.findIndex(path => this.ctx.isPointInPath(path, offsetX, offsetY))

            this.ctx.beginPath()
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 3
            this.ctx.moveTo(prevX, prevY)
            if(findIdx > -1) {
                this.ctx.lineTo(datas[findIdx].x, datas[findIdx].y)
            } else {
                this.ctx.lineTo(offsetX, offsetY)
            }
            this.ctx.stroke()
            this.ctx.closePath()
        }

        // 원 그려줌
        for(const index in this.pathList) {
            const path = this.pathList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                this.hoverIdx = index
            }
            this.ctx.fillStyle = this.hoverIdx == index ? 'yellow' : 'red'
            this.ctx.fill(path)
        }

        // 숫자 그려줌
        for(const index in this.history) {
            const {x,y} = datas[this.history[index]]

            this.ctx.beginPath()
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.font = '14px Arial'
            this.ctx.fillText(`${Number(index) + 1}`,x,y)
            this.ctx.closePath()
        }

        if (this.hoverIdx > -1) {
            const { name, image, x, y } = datas[this.hoverIdx]

            this.tooltipEl.querySelector('img').src = image
            this.tooltipEl.querySelector('.name').innerText = name

            this.tooltipEl.style.display = 'block'
            this.tooltipEl.style.left = `${x + 15}px`
            this.tooltipEl.style.top = `${y + 5}px`

            this.canvas.style.cursor = 'pointer'
        }

    }

    onmousedown({offsetX, offsetY}) {
        if (this.history.length === datas.length) {
            alert('이미 설정이 끝났습니다.')
            return
        }

        const findIdx = this.pathList.findIndex(path => this.ctx.isPointInPath(path, offsetX, offsetY))
        this.selectIdx = findIdx


        if (findIdx > -1) {
            if (this.history.length != 0
                 && this.history[this.history.length - 1] != this.selectIdx) {
                this.selectIdx = -1
                alert("오류")
                return
            }
        }
    }

    onMouseup({ offsetX, offsetY }) {
        const findIdx = this.pathList.findIndex(path => this.ctx.isPointInPath(path, offsetX, offsetY))
        if(this.selectIdx == findIdx) {
            this.selectIdx = -1
            return
        }

        if (this.history.includes(findIdx)) {
            this.selectIdx = -1
            alert("오류")
            return
        }

        if (findIdx > -1) {
            if (!this.history.length) {
                this.history.push(this.selectIdx)
            }
            this.history.push(findIdx)
        }
        this.selectIdx = -1
    }

    downloadImage() {
        if(this.history.length < 1) {
            alert("다운 불가")
            return
        }

        const newCanvas = document.createElement('canvas')
        const newCtx = newCanvas.getContext('2d')
        const img = document.querySelector('#map > img')

        newCanvas.width = this.WIDTH
        newCanvas.height = this.HEIGHT

        newCtx.beginPath()
        newCtx.fillStyle = 'black'
        newCtx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        newCtx.closePath()

        newCtx.drawImage(img,0,0)

        const pathImage = new Image()
        pathImage.onload = () => {
            newCtx.drawImage(pathImage, 0, 0)
            const aTag = document.createElement('a')
            aTag.href = newCanvas.toDataURL()
            aTag.download = 'route.png'
            aTag.click()
        }

        pathImage.src = this.canvas.toDataURL()
    }

    reset() {
        if(this.history.length <= 0) {
            alert("더이상 진행할 수 없음")
            return
        }
        this.history = []
        this.drawing()
    }

    undo() {
        if(this.history.length <= 0) {
            alert("더이상 진행할 수 없음")
            return
        }
        this.history.splice(-1,1)
        this.drawing()
    }



}

window.onload = () => {
    new Map()
}