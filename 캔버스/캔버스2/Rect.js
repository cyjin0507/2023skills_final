import Tool from "/Tool.js"
export default class RectTool extends Tool {
    constructor(ctx) {
        super(ctx)
        this.start = {x:0, y:0}
        this.lineWidthInput = document.querySelector('#lineWidthInput')
        this.color = document.querySelector('#colorPicker')
        this.draw = false

        this.init()
    }

    init() {
        const canvas = document.createElement('canvas')
        canvas.width = this.ctx.canvas.width
        canvas.height = this.ctx.canvas.height

        this.btx = canvas.getContext('2d') // 백업 캔버스 그리기
    }

    drawScreen(e) {
        console.log("draw");
        const {ctx, btx} = this
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(btx.canvas, 0, 0)
        const {x,y} = this.start
        const {x:tx, y:ty} = this.getPoint(e)
        this.ctx.strokeRect(x,y,tx-x,ty-y)
    }

    downHandle(e) {
        console.log("down");
        const {ctx, btx} = this
        btx.clearRect(0,0,btx.canvas.width, btx.canvas.height)
        btx.drawImage(ctx.canvas, 0, 0)
        this.start = this.getPoint(e)
        ctx.strokeStyle = this.color.value
        ctx.lineWidth = this.lineWidthInput.value
        ctx.setLineDash([5,10])
        this.draw = true
    }

    upHandle(e) {
        this.draw = false
        this.ctx.setLineDash([])
        this.drawScreen(e)
    }

    moveHandle(e) {
        if(!this.draw) return
        this.drawScreen(e)
    }

}