import Mark from "./Mark.js"
import Ping from "./Ping.js"

export default class Map {
    constructor(ctx, data) {
        this.ctx = ctx
        this.sData = data

        this.currentPhase = 0
        this.PHASE_SIZE = [800,1600,3200]
        this.isDragging = false

        this.cameraPos = {x:0, y:0}

        this.startX = 0
        this.startY = 0
        
        this.spaceKey = false
        this.backSpace = false

        this.frame = 0

        this.ping = new Ping(this.ctx)
        this.pingCheck = false
        this.sidebar = new Sidebar()

    }

    init() {
        this.data = this.sData['data']
        this.mark = new Mark(this.ctx)

        this.addEvent()
        this.render()
    }

    addEvent() {

    }

    render(size=this.currentPhase, bool=false) {
        if(size==0) {this.cameraPos.x = 0; this.cameraPos.y = 0;}
        if(bool) {
            if(size==1) {
                this.cameraPos.x = -400
                this.cameraPos.y = -400
            } else if(size==2) {
                this.cameraPos.x = -1200
                this.cameraPos.y = -1200
            }
        }
        this.currentPhase = size
        this.ctx.clearRect(0,0,800,800)

        datas[this.currentPhase].forEach((obj,idx)=> {
            const img = obj.img
            const x = obj.x
            const y = obj.y

            const dx = x + this.cameraPos.x
            const dy = y + this.cameraPos.y

            this.ctx.drawImage(img,dx,dy,800,800)
            if(idx==0) {
                this.startX = dx
                this.startY = dy
            }
        })

        this.ping.savePing(this.currentPhase,this.startX,this.startY)
        this.mark.draw(this.currentPhase,this.startX,this.startY,this.data)
    }

    mousedown(e) {
        this.isDragging = true
        if(this.spaceKey && !this.backSpace) {
            this.ping.click(e, this.startX, this.startY, this.currentPhase)
        }
    }

    mousemove(e) {
        if(this.spaceKey && !this.backSpace) {
            this.ping.mousemove(e,this.currentPhase)
            return
        } else if(this.spaceKey) {
            this.ping.update(this.currentPhase, this.startX, this.startY)
        }

        if(!this.isDragging) return

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
        if(this.pingCheck) {
            this.ping.close()
        }
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
            this.cameraPos.x = limit * -1
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

        this.render()
    }

    targetMark() {
        this.data = this.sidebar.val()
        this.render()
    }

    targetCancelMark() {
        this.data = this.sData['data']
        this.render()
    }

    placeSliding(e) {
        if(e.target.className != 'place-sliding') return

        let data = this.mark.val()
        let name = e.target.dataset.name

        let findData = data.find(x=>x.data.name==name)

        this.moveX = 400 - findData['percent'].lat
        this.moveY = 400 - findData['percent'].long

        this.beforeX = this.cameraPos.x
        this.beforeY = this.cameraPos.y

        requestAnimationFrame(this.focus.bind(this))
    }
    
    focus() {
        if(this.frame >= 1) {
            this.frame = 0
            return
        }

        this.frame = Math.min(1, this.frame+0.1)
        this.cameraPos.x = this.beforeX + (this.moveX * this.frame)
        this.cameraPos.y = this.beforeY + (this.moveY * this.frame)

        requestAnimationFrame(this.focus.bind(this))
    }

    keydownControl(e) {
        let keycode = e.keyCode

        if(keycode == 13) {

        }
    }

    val() {
        return this.sidebar.val()
    }

}