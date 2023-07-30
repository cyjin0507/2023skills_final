export default class Setting {
    constructor(ctx, blockWidth, blockHeight) {
        this.ctx = ctx
        this.blockWidth = blockWidth
        this.blockHeight = blockHeight

        this.drawLine()
    }

    drawLine() {
        this.ctx.beginPath()
        for(let i=1; i<=30; i++) {
            this.ctx.moveTo(this.blockWidth * i,0)
            this.ctx.lineTo(this.blockWidth * i,this.ctx.canvas.height)

            this.ctx.moveTo(0, this.blockHeight * i)
            this.ctx.lineTo(this.ctx.canvas.width,this.blockHeight * i)
        }

        this.ctx.stroke()
        this.ctx.closePath()

    }

}