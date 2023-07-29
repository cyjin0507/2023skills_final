import Tool from "/Tool.js"
export default class LineTool extends Tool {
    constructor(ctx) {
        super(ctx)
        this.before = {x:0, y:0}
        this.lineWidthInput = document.querySelector('#lineWidthInput')
        this.color = document.querySelector('#colorPicker')
        this.ctx.lineCap = "round"
        this.draw = false
    }

    downHandle(e) {
        const ctx = this.ctx
        this.before = this.getPoint(e)
        ctx.strokeStyle = this.color.ariaValueMax
        ctx.lineWidth = this.lineWidthInput.value
        this.draw = true
    }

    upHandle(e) {
        this.draw = false
    }

    moveHandle(e) {
        if(!this.draw) return
        const ctx = this.ctx

        ctx.beginPath()
        const {x:bx, y:by} = this.before
        ctx.moveTo(bx,by)
        const {x,y} = this.getPoint(e)
        ctx.lineTo(x,y)
        ctx.stroke()
        this.before = {x,y}
    }

}