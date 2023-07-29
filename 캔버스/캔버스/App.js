import Bullet from "./Bullet.js"
import Button from "./Button.js"
import Player from "./Player.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#gameCanvas')
        this.ctx = this.canvas.getContext('2d')
        this.before = 0
        this.imgs = {
            player: null,
            bullet : null,
        }

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = "middle"

        this.gameStart = false

        this.gameObjectList = []
        this.bulletList = []
        this.player = null
        this.init()
    }

    async init() {
        const h = window.innerHeight - 25
        const x = 600 * h / 700
        this.canvas.style.width = `${x}px`
        this.canvas.style.height = `${h}px`
        this.imgs.player = await this.loadImage("/image/mario.png")
        this.imgs.bullet = await this.loadImage("/image/bullet.png")

        this.player = new Player(185, 650, 30, 40, 100, this.imgs.player)
        this.gameObjectList.push(this.player)

        //this.gameObjectList.push(new Player(185, 650, 30, 40, 100, this.imgs.player))

        this.gameObjectList.push(new Button(450, 50, 120, 40, "GameStart", 
        e=>{this.start()}, this.canvas))

        for(let i=0; i<30; i++) {
            const b = new Bullet(0,0,15,30,50,this.imgs.bullet)
            this.bulletList.push(b)
            this.gameObjectList.push(b)
        }
        this.before = performance.now()
        requestAnimationFrame(this.frame)
    }

    start() {
        this.bulletList.forEach(x=> x.reset())
        this.gameStart = true
    }

    loadImage(src) {
        return new Promise((resolve, reject)=> {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
            img.onerror = e => reject(e)
        })
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
        ctx.strokeRect(10,10,400,680)

        this.gameObjectList.forEach(x=> x.render(ctx))
    }

    update = delta => {
        if(!this.gameStart) return
        this.gameObjectList.forEach(x=> x.update(delta))

        for(let i=0; i<this.bulletList.length; i++) {
            if(this.bulletList[i].checkCollision(this.player)) {
                this.gameOver()
                break
            }
        }
    }

    gameOver() {
        this.gameStart = false
    }


}

window.onload = () => {
    let app = new App()
}