export default class Map {
    constructor(type) {
        this.type = type

        this.WIDTH = 800
        this.HEIGHT = 800

        this.completeBtn = document.querySelector('#completeBtn')
        this.tooltip = document.querySelector('#tooltip')
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT

        this.init()
    }

    async init() {
        if(this.type == "guide") {
            this.tourDara = await $.getJSON('/process/tour/guide')
        } else {
            this.tourDara = await $.getJSON('/process/tour/user')
        }
        this.history = JSON.parse(this.tourDara[0].course)
        this.complete = JSON.parse(this.tourDara[0].complete)

        this.pointList = datas.forEach(({x,y})=> {
            const path = new Path2D()
            path.arc(x,y,10,0,Math.PI*2)
            return path
        })

        this.selectIdx = -1
        this.hoverIdx = -1

        this.addEvent()
        this.drawing()
    }

    addEvent() {
        this.canvas.addEventListener('mousemove', this.drawing.bind(this))

        if(this.type == "guide") {
            this.completeBtn.addEventListener('click', this.completeFunc.bind(this))
        }
    }

    drawing({offsetX, offsetY}) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
        this.tooltip.style.display = 'none'
        this.canvas.style.cursor = 'default'

        this.ctx.lineWidth = 3

        for(let i=0; i<this.history.length; i++) {
            const {x: prevX, y: prevY} = datas[this.history[i]]
            const {x: nextX, y: nextY} = datas[this.history[i+1]]

            if(this.complete[i]) {
                this.ctx.strokeStyle = 'green'
            } else {
                this.ctx.strokeStyle = 'red'
            }

            this.ctx.beginPath()
            this.ctx.moveTo(prevX, prevY)
            this.ctx.lineTo(nextX, nextY)
            this.ctx.stroke()
            this.ctx.closePath()
        }

        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                this.hoverIdx = index
            }

            let i = this.history[parseInt(index)]
            if(this.complete[i]) {
                this.ctx.fillStyle = 'green'
            } else {
                this.ctx.fillStyle = this.hoverIdx == index ? 'yellow' : 'red'
            }
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

            if(this.type == "guide") {
                this.completeBtn.dataset.idx = this.hoverIdx
            }
        }
    }

    async completeFunc(e) {
        let idx = e.target.dataset.idx
        let index = datas[this.history[idx]]

        if(this.index != 0 && !this.complete[index-1]) {
            alert("투어는 순차적으로 완료해주세요.")
            return
        }

        if(this.complete[index]) {
            alert("이미 완료된 투어입니다.")
            return
        }

        this.complete[index] = true

        const response = await $.ajax({
            url : '/complete/course',
            method : 'POST',
            data : JSON.stringify({
                idx : this.tourDara[0].idx,
                complete : JSON.stringify(this.complete)
            })
        })

        this.tourDara = await $.getJSON('/process/tour/guide')
        this.history = JSON.parse(this.tourDara[0].course)
        this.complete = JSON.parse(this.tourDara[0].complete)

        if(!this.complete.includes(false)) {
            await $.ajax({
                url : '/complete/tour',
                method : 'POST',
                data : JSON.stringify({
                    idx : this.tourDara[0].idx
                })
            })

            window.location.reload()
        }

        this.drawing()
    }

    
}