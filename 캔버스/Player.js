import GameObject from "/GameObject.js";
import {Stage as S} from "/Info.js"

export default class Player extends GameObject {
    constructor(x,y,w,h,speed,img) {
        super(x,y,w,h,speed)
        this.img = img
        this.keyInfo = []
        document.addEventListener('keydown', this.keydownHandle)
        document.addEventListener('keyup', this.keyupHandle)
    }

    keydownHandle = e => {
        this.keyInfo[e.keyCode] = true
    }

    keyupHandle = e => {
        this.keyInfo[e.keyCode] = false
    }

    update(d) {
        if(this.keyInfo[37]) {
            this.x -= this.speed * d
        }

        if(this.keyInfo[39]) {
            this.x += this.speed * d
        }

        if(this.x >= S.width + S.startX - this.w) {
            this.x = S.width + S.startX - this.w
        }

        if(this.x <= S.startX) {
            this.x = S.startX
        }

    }

    render(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

}