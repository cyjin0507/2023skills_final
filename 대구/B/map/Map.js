import { Data as phaseImages } from "./LoadImage.js"
import Mark from "./Mark.js"

export default class Map {
    constructor(ctx) {
        this.ctx = ctx
        this.currentPhase = 0
        this.PHASE_SIZE = [800, 1600, 3200]
        this.isDragging = false

        this.cameraPos = {x:0, y:0}

        this.frame = 0

        this.mark = new Mark(this.ctx)
        this.init()
    }

    init() {
        this.addEvent()
        this.render()

    }

    addEvent() {
        this.ctx.canvas.addEventListener('mousedown', () => this.mousedown());
        this.ctx.canvas.addEventListener('mousemove', (e) => this.mousemove(e));
        this.ctx.canvas.addEventListener('mouseup', () => this.mouseup());
        this.ctx.canvas.addEventListener('mouseleave', () => this.mouseup());

        this.ctx.canvas.addEventListener('mousewheel', (e) => this.mousewheel(e));
    }

    render(size = this.currentPhase) {
        this.mark.draw(this.currentPhase, this.cameraPos.x, this.cameraPos.y)

        this.currentPhase = size
        this.ctx.clearRect(0,0,800,800)
        phaseImages[size].forEach((obj, idx)=> {
            const img = obj.img
            const x = obj.x
            const y = obj.y

            const dx = (x + this.cameraPos.x)
            const dy = (y + this.cameraPos.y)

            console.log(dx, dy);

            this.ctx.drawImage(img, dx, dy, 800, 800)
        })
    }

    mousedown() {
        this.isDragging = true
    }

    mousemove(e) {
        if(!this.isDragging) {return}

        this.cameraPos.x += e.movementX
        this.cameraPos.y += e.movementY

        if(this.cameraPos.x > 0) this.cameraPos.x = 0
        if(this.cameraPos.y > 0) this.cameraPos.y = 0
        if((this.PHASE_SIZE[this.currentPhase] - 800) < Math.abs(this.cameraPos.x)) this.cameraPos.x = (this.PHASE_SIZE[this.currentPhase] * -1) + 800
        if((this.PHASE_SIZE[this.currentPhase] - 800) < Math.abs(this.cameraPos.y)) this.cameraPos.y = (this.PHASE_SIZE[this.currentPhase] * -1) + 800

        this.render()
    }

    mouseup() {
        this.isDragging = false
    }

    mousewheel(e) {
        if(e.wheelDelta > 0 && this.currentPhase < 2) {
            this.phaseUp(e)
        } else if(e.wheelDelta < 0 && this.currentPhase > 0) {
            this.phaseDown(e)
        }
    }

    phaseUp(e) {
        const prevPhase = this.currentPhase
        this.currentPhase++
        this.doZoom(prevPhase, e.offsetX, e.offsetY)
    }

    phaseDown(e) {
        const prevPhase = this.currentPhase
        this.currentPhase--
        this.doZoom(prevPhase, e.offsetX, e.offsetY)
    }

    doZoom(prevPhase, x, y) {
        const norX = (x + Math.abs(this.cameraPos.x)) / this.PHASE_SIZE[prevPhase]
        const norY = (y + Math.abs(this.cameraPos.y)) / this.PHASE_SIZE[prevPhase]

        const newX = norX * this.PHASE_SIZE[this.currentPhase] * -1 + 400
        const newY = norY * this.PHASE_SIZE[this.currentPhase] * -1 + 400

        const limit = this.PHASE_SIZE[this.currentPhase] - 800

        this.cameraPos.x = newX
        this.cameraPos.y = newY

        if(Math.abs(this.cameraPos.x) > limit) {
            this.cameraPos.x = limit*-1
        }

        if(this.cameraPos.x > 0) {
            this.cameraPos.x = 0
        }

        if(Math.abs(this.cameraPos.y) > limit) {
            this.cameraPos.y = limit * -1
        }

        if(this.cameraPos.y > 0) {
            this.cameraPos.y = 0
        }

        // requestAnimationFrame(this.animation)
        this.render()

    }

    // animation = () => {
    //     if(this.frame >= 1) {
    //         this.frame = 0
    //         return
    //     }
    //     this.frame = Math.min(1, this.frame + 0.01)
    //     requestAnimationFrame(this.animation)
    //     this.render()
    // }

}