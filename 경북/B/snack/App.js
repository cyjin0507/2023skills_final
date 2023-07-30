import Setting from "./Setting.js"
import Player from "./Player.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.blockWidth = this.canvas.width / 30
        this.blockHeight = this.canvas.height / 30

        this.playerList = []

        for(let i=0; i<5; i++) {
            this.player = new Player(this.ctx, 14, 15 - i, this.blockWidth, this.blockHeight, i)
            this.playerList.push(this.player)
        }

        this.before = performance.now()
        requestAnimationFrame(this.frame)
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
        this.playerList.forEach((x)=> x.update(delta))
    }

}

window.onload = () => {
    let app = new App()
}