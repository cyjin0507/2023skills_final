export default class Ping {
    constructor(ctx) {
        this.ctx = ctx
    }

    mousedown(e) {
        let x = e.offsetX
        let y = e.offsetY

        this.ctx.beginPath()
        this.ctx.arc(x, y, 10, 0, Math.PI*2)
        this.ctx.fill()
    }
    
    mouseup(e) {
        this.ctx.closePath()
        console.log("up");
    }

    mousemove(e) {
        console.log("move");
    }

}