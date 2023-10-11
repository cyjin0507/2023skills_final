export default class Pie {
    constructor() {
        this.canvas = document.querySelector('#pie')
        this.ctx = this.canvas.getContext('2d')

        this.init()
    }

    async init() {
        this.datas = (await $.getJSON('/json/visitors.json'))['data']

        this.size = 500
        this.chartSize = 280
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.datas.length

        this.maxValue = this.ceil(Math.max(...this.datas.map(x=>x.visitor)))
        this.count = this.maxValue / 50000 + 1

        this.frame = 0
        this.pointList = []

        this.render()
        requestAnimationFrame(this.animation.bind(this))

        this.canvas.addEventListener('mousemove', this.mousemove.bind(this))
    }

    render() {
        this.pointList = []
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        
        for(let i=0; i<=this.count; i++) {
            this.ctx.beginPath()
            for(let j=0; j<=this.datas.length; j++) {
                const x = Math.cos(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i) + this.center
                const y = Math.sin(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i) + this.center

                if(j==0) {
                    this.ctx.moveTo(x,y)    
                    this.ctx.fillText(50000 * i < this.maxValue ? 50000 * i : this.maxValue, x, y)
                } else {
                    this.ctx.lineTo(x,y)
                }

                if(i==Math.ceil(this.count) && j<this.datas.length) {
                    this.ctx.fillText(this.datas[j].name, x, y)
                }
            }
            this.ctx.stroke()
            this.ctx.closePath()
        }

        this.ctx.beginPath()
        this.ctx.globalAlpha = 0.5
        for(let i=0; i<=this.datas.length; i++) {
            const visitor = this.datas[i]?.visitor || this.datas[0].visitor
            const x = Math.cos(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.frame + this.center
            const y = Math.sin(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.frame + this.center

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

        for(let i=0; i<this.datas.length; i++) {
            const {visitor} = this.datas[i]
            const x = Math.cos(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.frame + this.center
            const y = Math.sin(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.frame + this.center

            const path = new Path2D()
            path.arc(x,y,4,0,Math.PI*2)

            this.ctx.beginPath()
            this.ctx.fill(path)
            this.ctx.closePath()

            this.pointList.push(path)
        }
    }

    animation() {
        if(this.frame >= 1) {
            this.frame = 0
            return
        }

        this.frame = Math.min(1, this.frame+0.1)
        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    mousemove({offsetX, offsetY}) {
        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                $('.tooltip').css({
                    display : 'block',
                    left : `${offsetX + 10}px`,
                    top : `${offsetY + 10}px`,
                })

                $('.tooltip').html(`
                    ${this.datas[index].name} <br>
                    ${this.datas[index].name} ${this.datas[index].visitor}명
                `)
                break
            } else {
                $('.tooltip').hide()
            }
        }
    }

    ceil(number, unit=10000) {
        return Math.ceil(number / unit) * unit
    }

}