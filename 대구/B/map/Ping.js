export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.canvasCopy = document.createElement('canvas')
        this.canvasCopy.width = this.ctx.canvas.width
        this.canvasCopy.height = this.ctx.canvas.height
        this.btx = this.canvasCopy.getContext('2d')

        this.dragging = false
        this.curve = 0

        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0

        this.pos = []

    }

    mousedown(e) {
        this.dragging = true
        this.pos.push({
            x: e.offsetX,
            y: e.offsetY
        })
        this.startX = e.offsetX
        this.startY = e.offsetY

        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas, 0,0)
        this.ctx.setLineDash([5,10])

        this.dragging = true

    }

    
    mouseup(e) {
        if(!this.dragging) {return}
        this.curve++
        this.ctx.setLineDash([])
        if(this.curve % 2 == 0) {
            console.log("aa");
            this.ctx.setLineDash([])
        } else {
            console.log("bb");
            this.ctx.setLineDash([5,10])
        }
        this.draw()
    }

    mousemove(e) {
        if(!this.dragging) {return}

        this.nowX = e.offsetX
        this.nowY = e.offsetY

        this.draw()
    }

    draw() {
        this.ctx.clearRect(0,0,800,800)
        this.ctx.drawImage(this.btx.canvas,0,0)

        this.ctx.arc(this.startX,this.startY,10,0,Math.PI*2)
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(this.nowX, this.nowY)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    savePing(size, startX, startY) {
        
    }

    close() {
        this.dragging = false

        let lastPos = this.pos[this.pos.length-1]
        this.btx.fillStyle = 'blue'
        this.btx.arc(lastPos.x, lastPos.y, 10, 0, Math.PI*2)
        this.btx.fill()
        this.ctx.drawImage(this.btx.canvas, 0, 0)
        // this.btx.clearRect(0,0,800,800)
    }

    val() {
        return this.dragging
    }


}