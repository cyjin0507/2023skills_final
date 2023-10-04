export default class Pie {
    constructor() {
        this.canvas = document.querySelector('#pie-canvas')
        this.ctx = this.canvas.getContext('2d')

        this.init()
    }

    async init() {
        this.datas = (await $.getJSON(''))['data']

        this.size = 500
        this.chartSize = 280
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.datas.length

        this.maxValue = this.ceil(Math.max(...this.datas.map(x=>x.visitor)))
        this.count = this.maxValue / 50000 + 1

        this.ctx.textAlign = 'center'
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = 'black'

        this.pointList = []
        this.frame = 0

        this.render()
        requestAnimationFrame(this.animation.bind(this))

        this.canvas.addEventListener('mousemove', this.mousemove.bind(this))
    }

    render() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.pointList = []

        for(let i=0; i<=count; i++) {
            this.ctx.beginPath()
            for(let j=0; j<=this.datas.length; i++) {
                const x = (Math.cos(this.radian * j - Math.PI /2) * (this.chartSize / this.count * i)) + this.center
                const y = (Math.sin(this.radian * j - Math.PI /2) * (this.chartSize / this.count * i)) + this.center
                if(j==0) {
                    this.ctx.moveTo(x,y)
                    this.ctx.fillText(i*50000 < this.maxValue ? i*50000 : this.maxValue)
                } else {
                    this.ctx.lineTo(x,y)
                }

                if(i==Math.ceil(this.count) && j<this.datas.length) {
                    this.ctx.fillText(this.datas[j].name, x, y)
                }
            }
            this.ctx.closePath()
        }

        this.ctx.beginPath()
        this.ctx.globalAlpha = 0.5
        for(let i=0; i<=this.datas.length; i++) {
            const value = this.datas[i]?.visitor || this.datas[0].visitor
            const x = (Math.cos(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.frame) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.frame) + this.center

            if(i==0) {
                this.ctx.moveTo(x,y)
            } else {
                this.ctx.lineTo(x,y)
            }
        }
        this.ctx.fill()
        this.ctx.globalAlpha = 1
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        for(let i=0; i<this.datas.length; i++) {
            const value = this.datas[i]
            const x = (Math.cos(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.frame) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.frame) + this.center

            const path = new Path2D()
            path.arc(x,y,4,0,Math.PI*2)

            this.ctx.beginPath()
            this.ctx.fill(path)
            this.ctx.closePath()

            this.pointList.push(path)
        }        
        this.ctx.closePath()
    }

    animation() {
        if(this.frame >= 1) {
            return
        }

        this.frame = Math.min(1, this.frame + 0.01)
        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    mousemove({offsetX, offsetY}) {
        
    }

}