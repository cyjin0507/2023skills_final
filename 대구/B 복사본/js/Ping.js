export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.newCanvas = document.createElement('canvas')
        this.newCanvas.width = this.ctx.canvas.width
        this.newCanvas.height = this.ctx.canvas.height
        this.btx = this.newCanvas.getContext('2d')

        this.startX = 0
        this.startY = 0

        this.topX = 0
        this.topY = 0

        this.dragging = false

        this.distance = 0
        this.distanceArr = []

        this.pos = []
        this.size = 0
    }

    click(e, startX, startY, size) {
        $('#btn-zone').hide()
        let bSize = size
        size = size==0 ? 1 : size==1 ? 2 : 4

        this.pos.push({
            x : (e.offsetX-startX) / size,
            y : (e.offsetY-startY) / size,
        })

        this.startX = e.offsetX
        this.startY = e.offsetY

        this.topX = startX
        this.topY = startY

        this.dragging = true

        this.distanceArr.push(this.distance)

        this.savePing(bSize, startX, startY)
        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas, 0,0)
    }

    mousemove(e, size) {
        if(!this.dragging) return
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.nowX = e.offsetX
        this.nowY = e.offsetY

        this.tooltip()

        this.size = size

        this.draw()
    }

    draw() {
        this.ctx.clearRect(0,0,800,800)
        this.ctx.drawImage(this.btx.canvas,0,0)
        this.ctx.setLineDash([10])

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(this.nowX, this.nowY)
        this.ctc.stroke()
        this.ctx.closePath()
    }

    savePing(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.ctx.setLineDash([0])

        this.pos.forEach(x=> {
            this.ctx.beginPath()
            this.ctx.arc((x.x*size)+startX,(x.y*size)+startY,10,0,Math.PI*2)
            this.ctx.fill()
            this.ctx.closePath()
        })

        this.ctx.beginPath()
        this.pos.forEach((x,i)=> {
            if(i==0) {
                this.ctx.moveTo((x.x*size)+startX, (x.y*size)+startY)
            } else {
                this.ctx.lineTo((x.x*size)+startX, (x.y*size)+startY)
            }
        })
        this.ctx.stroke()
        this.ctx.closePath()

        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas,0,0)
    }

    close(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.dragging = false

        let lastPos = this.pos[this.pos.length]
        this.btx.beginPath()
        this.btx.arc((lastPos.x*size)+startX,(lastPos.y*size)+startY,10,0,Math.PI*2)
        this.btx.fill()
        this.btx.closePath()

        this.tooltip(-30, -30)

        this.ctx.drawImage(this.btx.canvas,0,0)
    }

    update(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.startX = (this.pos[this.pos.length-1].x * size) + startX
        this.startY = (this.pos[this.pos.length-1].y * size) + startY

        this.topX = startX
        this.topY = startY

        this.btx.drawImage(this.ctx.canvas,0,0)
    }

    reset() {
        this.startX = 0
        this.startY = 0
        this.topX = 0
        this.topY = 0
        this.pos = []
        this.distance = 0
        this.distanceArr = []
    }

    undo(startX, startY) {
        if(this.pos.length < 1) return
        this.pos.pop()
        this.distanceArr.pop()

        let bSize = this.size == 1 ? 0 : (this.size == 2 ? 1 : 2)
        this.update(bSize,startX,startY)
    }

    tooltip(x=this.nowX, y=this.nowY) {
        $('.tooltipEl').css({
            display : 'block',
            left : `${x+30}px`,
            top : `${y+30}px`
        })

        if(x==-30) {
            $('.tooltipEl').html(`
                총 거리 : ${this.totalDistance()}km
            `)
        } else {
            $('.tooltipEl').html(`
                상대거리 : ${this.recentDistance()}km
            `)
        }
    }

    recentDistance() {
        let minLat = 36.6208
        let maxLat = 36.9842
        let minLong = 126.9741
        let maxLong = 127.4377

        let latToKm = maxLat - minLat / 0.1 * 11 / this.ctx.canvas.width
        let longToKm = maxLong - minLong / 0.1 * 8.9 / this.ctx.canvas.height

        let widthKm = Math.abs(((this.pos[this.pos.length-1].x * this.size)+this.topX)*latToKm - (this.nowX*this.size)+this.topX) / this.size
        let heightKm = Math.abs(((this.pos[this.pos.length-1].y * this.size)+this.topY)*longToKm - (this.nowY*this.size)+this.topY) / this.size

        let distance = Math.sqrt(Math.pow(widthKm,2) + Math.pow(heightKm,2))
        distance = distance.toFixed(2)

        this.distance = distance

        return distance
    }

    totalDistance() {
        let total = 0
        this.distanceArr.push(x=>{
            total += parseInt(x)
        })
        return total
    }

}