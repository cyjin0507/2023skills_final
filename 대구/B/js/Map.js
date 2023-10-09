import Mark from "./Mark.js"
import Ping from "./Ping.js"
import Sidebar from "./Sidebar.js"
import {LoadImages} from "./LoadImage.js"

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

        this.spaceKey = 0
        this.backSpace = 0

        this.frame = 0

        this.ping = new Ping(this.ctx)
        this.pingCheck = false
        this.sidebar = new Sidebar()

        this.init()
    }

    init() {
        this.data = this.sData['data']
        this.mark = new Mark(this.ctx)

        this.addEvent()
        this.render()
    }

    addEvent() {
        this.ctx.canvas.addEventListener('mousemove', (e)=>this.onmousemove(e))
        this.ctx.canvas.addEventListener('mousedown', (e)=>this.onmousedown(e))
        this.ctx.canvas.addEventListener('mouseup', (e)=>this.onmouseup(e))
        this.ctx.canvas.addEventListener('mouseleave', (e)=>this.onmouseup(e))
        this.ctx.canvas.addEventListener('mousewheel', (e)=>this.onmousewheel(e))

        this.ctx.canvas.addEventListener('dblclick', ()=> {
            this.ping.undo(this.startX, this.startY)
            this.ping.undo(this.startX, this.startY)
            this.render()
            this.ping.savePing(this.size, this.startX, this.startY)
            this.pingCheck = false
            this.ping.close()
            $('#distanceBtn').removeClass('active')
        })

        document.addEventListener('keydown', this.keydownControl.bind(this))
        document.addEventListener('keyup', this.keyupControl.bind(this))

        document.querySelector('#side-list tbody').addEventListener('click', this.placeSliding.bind(this))
        document.querySelector('#targetMarkBtn').addEventListener('click', this.targetMark.bind(this))
        document.querySelector('#targetCancelMarkBtn').addEventListener('click', this.targetCancelMark.bind(this))
        document.querySelector('#distanceBtn').addEventListener('click', this.pingOn.bind(this))

        document.querySelector('#user-loc').addEventListener('click', this.userSliding.bind(this))

        

    }

    render(size=this.currentPhase, bool=false) {
        if(size==0) {this.cameraPos.x = 0; this.cameraPos.y = 0;}

        if(bool) {
            if(size==1) {
                this.cameraPos.x = -400
                this.cameraPos.y = -400
            }
            if(size==2) {
                this.cameraPos.x = -1200
                this.cameraPos.y = -1200
            }
        }

        this.currentPhase = size
        this.ctx.clearRect(0,0,800,800)

        LoadImages[this.currentPhase].forEach((obj, idx)=> {
            const img = obj.image
            const x = obj.x
            const y = obj.y

            const dx = this.cameraPos.x + x
            const dy = this.cameraPos.y + y

            this.ctx.drawImage(img,dx,dy,800,800)

            if(idx==0) {
                this.startX = dx
                this.startY = dy
            }
        })

        this.ping.savePing(this.currentPhase, this.startX, this.startY)
        this.mark.draw(this.currentPhase, this.startX, this.startY, this.data)
    }

    onmousedown(e) {
        e.preventDefault()
        this.isDragging = true
        if(this.pingCheck && !this.spaceKey) {
            this.ping.click(e, this.startX, this.startY, this.currentPhase)
        }
    }

    onmousemove(e) {
        if(this.pingCheck && !this.spaceKey) {
            this.ping.mousemove(e, this.currentPhase)
            return
        } else if(this.pingCheck) {
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

    onmouseup(e) {
        this.isDragging = false
    }

    onmousewheel(e) {
        e.preventDefault()
        if(this.pingCheck) {
            this.ping.close()
            this.pingCheck = false
        }

        $('#btn-zone').hide()

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
        
        const limit  = this.PHASE_SIZE[this.currentPhase] - 800

        this.cameraPos.x = newX
        this.cameraPos.y = newY

        if(this.cameraPos.x > 0) {
            this.cameraPos.x = 0
        }
        if(Math.abs(this.cameraPos.x) > limit) {
            this.cameraPos.x = limit * -1
        }

        if(this.cameraPos.y > 0) {
            this.cameraPos.y = 0
        }
        if(Math.abs(this.cameraPos.y) > limit) {
            this.cameraPos.y = limit * -1
        }

        this.render()
    }

    keydownControl(e) {
        let keyCode = e.keyCode
        if(keyCode == 27) {
            this.pingCheck = false
            this.ping.close()
            $('#distanceBtn').removeClass('active')
        }

        if(keyCode == 8) {
            if(this.backSpace) return
            this.backSpace = true
            this.ping.undo(this.startX, this.startY)
            this.render()
            this.ping.savePing(this.currentPhase, this.startX, this.startY)
        }

        if(keyCode == 32) {
            this.spaceKey = true
        }
    }

    keyupControl(e) {
        let keyCode = e.keyCode
        if(keyCode == 8) {
            this.backSpace = false
        }
        if(keyCode == 32) {
            this.spaceKey = false
        }
    }

    targetMark() {
        this.data = this.sidebar.val()
        this.data.push(this.sData['data'].find(x=>x.name=="user"))
        this.render()

        $('#targetCancelMarkBtn').show()
        $('#targetMarkBtn').hide()
    }

    targetCancelMark() {
        this.data = this.sData['data']
        this.render()
        $('#targetCancelMarkBtn').hide()
        $('#targetMarkBtn').show()
    }

    placeSliding(e) {
        if(e.target.className != 'place-sliding') return
        if(this.currentPhase == 0) return

        $('#btn-zone').hide()

        let data = this.mark.val()
        let name = e.target.dataset.name

        let findData = data.find(x=>x.data.name == name)
        
        this.beforeX = this.cameraPos.x
        this.beforeY = this.cameraPos.y

        this.moveX = 400 - findData['percent'].lat
        this.moveY = 400 - findData['percent'].long

        requestAnimationFrame(this.focus.bind(this))
    }

    userSliding() {
        if(this.currentPhase == 0) return

        $('#btn-zone').hide()
        let findData = (this.mark.val()).find(x=>x.data.name=="user")
        this.beforeX = this.cameraPos.x
        this.beforeY = this.cameraPos.y

        this.moveX = 400 - findData['percent'].lat
        this.moveY = 400 - findData['percent'].long

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
        this.render()
        requestAnimationFrame(this.focus.bind(this))
    }

    pingOn() {
        this.pingCheck = true
        this.ping.reset()
        this.render()
        $('#distanceBtn').addClass('active')
    }

}