export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.canvasCopy = document.createElement('canvas')
        this.canvasCopy.width = this.ctx.canvas.width
        this.canvasCopy.height = this.ctx.canvas.height
        this.btx = this.canvasCopy.getContext('2d')

        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0

    }

    mousedown(e) {
        this.startX = this.endX = e.offsetX
        this.startY = this.endY = e.offsetY
        this.btx.drawImage(this.ctx.canvas,0,0)
    }
    
    mouseup(e) {
        this.savePing()
        
    }

    mousemove(e) {
        this.endX = e.offsetX
        this.endY = e.offsetY

        this.draw()
    }

    draw() {
        this.btx.beginPath()

        // 시작지점 원
        this.btx.arc(this.startX, this.startY, 5, 0, Math.PI*2)
        this.btx.fill()

        this.btx.setLineDash([5,10])
        this.btx.moveTo(this.startX, this.startY)
        this.btx.lineTo(this.endX, this.endY)

        this.btx.stroke()
        
        this.ctx.drawImage(this.btx.canvas,0,0)

        this.btx.closePath()
        this.btx.clearRect(0,0,800,800)
    }

    savePing(size, startX, startY) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.startX + startX, this.startY + startY)
        this.ctx.lineTo(this.endX + startX, this.endY + startY)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.arc(this.startX + startX, this.startY + startY, 5, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.arc(this.endX + startX, this.endY + startY, 5, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()
    }


}