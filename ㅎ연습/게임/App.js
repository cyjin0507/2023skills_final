import Item from "./Item.js"
import Player from "./Player.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        this.imgs = {
            player : null,
            items : []
        }

        this.gameStart = false
        this.collisionCheck = false

        this.gameObjectList = []
        this.itemList = []

        this.score = 0

        this.init()

    }

    async init() {
        const itemList = ['car', 'grape', 'knife', 'pan', 'soondae', 'walnut-cookie']
        for(let i=0;i<itemList.length;i++) {
            this.imgs.items.push(await this.loadImage(`/game/${itemList[i]}.png`))
        }
        this.before = performance.now()

        for(let i=0; i<10; i++) {
            let rnd = Math.floor(Math.random() * 6)
            this.items = new Item(185, 650, 30, 40, 100, this.imgs.items[rnd])
            this.itemList.push(this.items)
            this.gameObjectList.push(this.items)
        }

        this.imgs.player = await this.loadImage(`/game/charactor.png`)
        this.player = new Player(270, 760, 30, 40, 100, this.imgs.player)
        this.gameObjectList.push(this.player)

        requestAnimationFrame(this.frame)
    }

    frame = now => {
        if(this.gameStart) {return}
        this.update((now - this.before) / 500)
        this.render(this.ctx)
        this.before = now
        requestAnimationFrame(this.frame)
    }

    update = delta => {
        this.gameObjectList.forEach(x=> x.update(delta))

        for(let i=0; i<this.itemList.length; i++) {
            if(this.itemList[i].checkCollision(this.player)) {
                let type = this.itemList[i].img.dataset.type
                if(type=="grape" || type=="soondae" || type=="walnut-cookie") {
                    this.score++
                } else {
                    this.score--
                }
                this.scoreSet()
                this.itemList[i].reset()
                break
            }
        }
    }

    render = ctx => {
        const w = ctx.canvas.width
        const h = ctx.canvas.height
        ctx.clearRect(0,0,w,h)
        this.gameObjectList.forEach(x=> x.render(ctx))
    }

    loadImage(src) {
        let type = src.replace('/game/', '').replace('.png', '')
        return new Promise((resolve, reject)=> {
            const img = new Image()
            img.src = src
            img.dataset.type = type
            img.onload = () => resolve(img)
            img.onerror = e => reject(e)
        })
    }

    scoreSet() {
        if(this.score <= 0) {this.gameOver()}
        $('#score').html(this.score)
    }

    gameOver() {
        this.gameStart = true
    }

}

window.onload = () => {
    new App()
}