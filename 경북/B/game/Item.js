import GameObject from "/game/GameObject.js";
import {Stage as S} from "/game/Info.js"

export default class Bullet extends GameObject {
    constructor(x,y,w,h,speed,img) {
        super(x,y,w,h,speed)
        this.img = img
        this.localSpeed = 0
        this.reset()
    }

    reset() {
        this.localSpeed = Math.random() * this.speed + 100
        this.x = Math.random() * (S.width - this.w) + S.startX
        this.y = S.startY
    }

    update(d) {
        this.y += this.localSpeed * d
        if(this.y >= S.startY + S.height + this.h) {
            this.reset()
        }
    }

    render(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    checkCollision({x,y,w,h}) {
        let r1 = (w + h) * 0.25
        let r2 = (this.w + this.h) * 0.25
        let d = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))
        return (r1 + r2) > d
    }

}