import { Data as phaseImages } from "./LoadImage.js"
import Mark from "./Mark.js"
import Ping from "./Ping.js"
import SideBar from "./SideBar.js"

export default class Map {
    constructor(ctx) {
        this.ctx = ctx
        this.currentPhase = 0
        this.PHASE_SIZE = [800, 1600, 3200]
        this.isDragging = false

        this.cameraPos = {x:0, y:0}

        this.frame = 0

        this.startX = 0
        this.startY = 0

        this.space = false

        // 처음에는 json 불러오지 않기
        this.firstDataCheck = false

        this.ping = new Ping(this.ctx)
        this.sideBar = new SideBar()

        this.init()
    }
    
    async init() {
        this.sData = await $.getJSON('/json/attraction.json')
        this.data = this.sData['data']

        this.mark = new Mark(this.ctx)

        this.addEvent()
        this.render()

    }

    addEvent() {
        this.ctx.canvas.addEventListener('mousedown', (e) => this.mousedown(e));
        this.ctx.canvas.addEventListener('mousemove', (e) => this.mousemove(e));
        this.ctx.canvas.addEventListener('mouseup', (e) => this.mouseup(e));
        this.ctx.canvas.addEventListener('mouseleave', (e) => this.mouseup(e));

        this.ctx.canvas.addEventListener('mousewheel', (e) => this.mousewheel(e));

        // 추가된 명소만 보기
        $('#only-view-btn').click(this.targetMark.bind(this))
        // 명소 슬라이딩
        $('#side-bar tbody').click(this.placeSliding.bind(this))
        

    }

    render(size = this.currentPhase) {
        if(size==0) {this.cameraPos.x=0; this.cameraPos.y=0;}

        this.currentPhase = size
        this.ctx.clearRect(0,0,800,800)
        phaseImages[size].forEach((obj, idx)=> {
            const img = obj.img
            const x = obj.x
            const y = obj.y

            const dx = (x + this.cameraPos.x)
            const dy = (y + this.cameraPos.y)

            this.ctx.drawImage(img, dx, dy, 800, 800)
            if(idx==0) {
                this.startX = dx
                this.startY = dy
            }
        })
        
        if(this.firstDataCheck) {
            this.ping.savePing(this.currentPhase, this.startX, this.startY)
        }
        this.mark.draw(this.currentPhase, this.startX, this.startY, this.data)
        this.firstDataCheck = true

    }

    mousedown(e) {
        this.isDragging = true
        this.ping.mousedown(e)
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
        this.ping.mousemove(e)
    }

    mouseup(e) {
        this.isDragging = false
        // this.render()
        this.ping.mouseup(e)
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

        this.render()
    }

    targetMark() {
        this.data = this.sideBar.val()
        this.render()
    }

    placeSliding(e) {
        if(e.target.className != 'side-name') {return}
        if(this.currentPhase==0) {return}

        let data = this.mark.val()
        let name = e.target.dataset.name

        let findData = data.find(x=>x.data.name==name)
        this.moveX = 400 - findData['percent'].lat
        this.moveY = 400 - findData['percent'].long

        this.beforeX = this.cameraPos.x
        this.beforeY = this.cameraPos.y

        requestAnimationFrame(this.focus)
    }

    focus = () => {
        if(this.frame >= 1) {
            this.frame = 0
            console.log(this.cameraPos.x);
            return
        }
        this.frame = Math.min(1, this.frame+0.1)
        this.cameraPos.x = this.beforeX + (this.moveX * this.frame)
        this.cameraPos.y = this.beforeY + (this.moveY * this.frame)
        this.render()
        requestAnimationFrame(this.focus)
    }

}