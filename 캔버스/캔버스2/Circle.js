import Tool from "/Tool.js"
export default class CircleTool extends Tool {
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
        const {ctx, btx} = this
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(btx.canvas, 0, 0)
        const {x,y} = this.start
        const {x:tx, y:ty} = this.getPoint(e)

        ctx.beginPath()
        const r = Math.sqrt(Math.pow(x-tx,2) + Math.pow(y-ty,2))
        ctx.arc(x,y,r,0,Math.PI*2)
        ctx.stroke()
        ctx.closePath()
    }

    downHandle(e) {
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