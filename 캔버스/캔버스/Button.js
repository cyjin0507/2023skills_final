import GameObject from "./GameObject.js";

export default class Button extends GameObject {
    constructor(x,y,w,h,text,action,canvas) {
        super(x,y,w,h,0)
        this.text = text
        this.action = action
        this.hover = false
        this.scale = canvas.width / parseInt(getComputedStyle(canvas).width)

        canvas.addEventListener("mousemove", this.moveHandle)
        canvas.addEventListener("mousedown", this.downHandle)
    }

    downHandle = e => {
        if(this.hover) {
            this.action()
        }
    }

    moveHandle = e => {
        this.hover = e.offsetX * this.scale > this.x
            && e.offsetX * this.scale < this.x + this.w
            && e.offsetY * this.scale > this.y
            && e.offsetY * this.scale < this.y + this.h
    }

    update(d) {

    }

    render(ctx) {
        ctx.save()
        ctx.font = "17px Arial"
        if(this.hover) {
            ctx.fillStyle = "#555"
            ctx.fillRect(this.x, this.y, this.w, this.h)
            ctx.fillStyle = "#fff"
            ctx.fillText("Start", this.x + this.w*0.5, this.y + this.h*0.5)
        } else {
            ctx.strokeStyle = "#555"
            ctx.strokeRect(this.x, this.y, this.w, this.h)
            ctx.fillStyle = "#555"
            ctx.fillText("Start", this.x + this.w*0.5, this.y + this.h*0.5)
        }
        ctx.restore()
    }
    
}