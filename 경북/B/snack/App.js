import Setting from "./Setting.js"
import Player from "./Player.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.blockWidth = this.canvas.width / 30
        this.blockHeight = this.canvas.height / 30

        this.keyCheck = false
        document.addEventListener('keydown', this.keydownHandle)
        document.addEventListener('keyup', this.keyupHandle)

        this.playerList = []
        this.forwardList = []
        this.forward = "down"

        for(let i=0; i<5; i++) {
            this.player = new Player(this.ctx, 14, 15 - i, this.blockWidth, this.blockHeight)
            this.playerList.push(this.player)
            this.forwardList.push("down")
        }

        this.before = performance.now()
        requestAnimationFrame(this.frame)
    }

    keydownHandle = (e) => {
        if(this.keyCheck) {return}
        this.keyCheck = true
        if(e.keyCode == 39) {this.forward = "left"}
        else if(e.keyCode == 37) {this.forward = "right"}
        else if(e.keyCode == 38) {this.forward = "up"}
        else if(e.keyCode == 40) {this.forward = "down"}

        this.forwardList.pop()
        this.forwardList.unshift(this.forward)

        console.log(this.forwardList);

    }

    keyupHandle = (e) => {
        this.keyCheck = false
    }

    frame = now => {
        this.update((now - this.before) / 1000)
        this.render(this.ctx)
        this.before = now
        requestAnimationFrame(this.frame)
    }

    render = ctx => {
        const w = ctx.canvas.width
        const h = ctx.canvas.height

        ctx.clearRect(0,0,w,h)
        new Setting(this.ctx, this.blockWidth, this.blockHeight)

        this.playerList.forEach(x=> x.render())
    }

    update = delta => {
        this.playerList.forEach((x,i)=> x.update(delta,i,this.forwardList))
    }

}

window.onload = () => {
    let app = new App()
}