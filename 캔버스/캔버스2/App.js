import LineTool from "/Line.js";
import RectTool from "/Rect.js";
import CircleTool from "/Circle.js";

class App {
    constructor() {
        this.toolIndex = 0
        const ctx = this.ctx = document.querySelector('#myCanvas').getContext('2d')

        this.toolList = [
            new LineTool(ctx),
            new RectTool(ctx),
            new CircleTool(ctx)
        ]

        this.addEvent()
    }

    addEvent() {
        this.ctx.canvas.addEventListener('mousedown', this.downHandle)
        this.ctx.canvas.addEventListener('mousemove', this.moveHandle)
        this.ctx.canvas.addEventListener('mouseup', this.upHandle)

        document.querySelector('.menu').addEventListener('click', e=> {
            if(e.target.classList.contains('menu-btn')) {
                document.querySelector(`.menu > .menu-btn[data-idx="${this.toolIndex}"]`).classList.remove('active')

                this.toolIndex = e.target.dataset.idx * 1 // 숫자로
                e.target.classList.add('active')
            }
        })
    }

    upHandle = e => {
        const tool = this.toolList[this.toolIndex]
        if(tool.downHandle === undefined) return
        tool.upHandle(e)
    }

    downHandle = e => {
        const tool = this.toolList[this.toolIndex]
        if(tool.downHandle === undefined) return
        tool.downHandle(e)
    }

    moveHandle = e => {
        const tool = this.toolList[this.toolIndex]
        if(tool.downHandle === undefined) return
        tool.moveHandle(e)
    }


}

window.onload = () => {
    let app = new App()
}