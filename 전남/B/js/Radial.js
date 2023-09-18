class Radial {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.init()
    }

    async init() {
        this.datas = (await $.getJSON('/json/visitors.json'))['data']

        this.size = 500
        this.chartSize = 280
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.datas.length

        this.maxValue = this.ceil(Math.max(...this.datas.map(d => d.visitor)))
        this.count = this.maxValue / 50000 + 1

        this.pointPaths = []

        this.animateProcess = 0

        requestAnimationFrame(this.renderWidthAnimation.bind(this))
        this.render()

        this.canvas.addEventListener('mousemove', this.tooltip.bind(this))
    }

    render() {
        this.ctx.textAlign = 'center'
        for (let i = 0; i <= this.count; i++) {
            this.ctx.beginPath()
            for (let j = 0; j <= this.datas.length; j++) {
                const x = (Math.cos(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center
                const y = (Math.sin(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center

                if (j == 0) {
                    this.ctx.moveTo(x, y)
                    this.ctx.fillText(50000 * i < this.maxValue ? 50000 * i : this.maxValue, x, y)
                } else {
                    this.ctx.lineTo(x, y)
                }

                if(i==Math.floor(this.count) && j!=this.datas.length) {
                    this.ctx.fillText(this.datas[j].name, x, y+10)
                }

            }

            this.ctx.stroke()
            this.ctx.closePath()
        }

        this.ctx.beginPath()
        this.ctx.globalAlpha = 0.5
        for (let i = 0; i <= this.datas.length; i++) {
            const value = this.datas[i]?.visitor || this.datas[0].visitor
            const x = (Math.cos(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.animateProcess) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * value / this.maxValue * 220 * this.animateProcess) + this.center

            if (i == 0) {
                this.ctx.moveTo(x, y)
            } else {
                this.ctx.lineTo(x, y)
            }
        }
        this.ctx.fill()
        this.ctx.globalAlpha = 1
        this.ctx.lineWidth = 3
        this.ctx.stroke()

        this.ctx.closePath()

        for (let i = 0; i < this.datas.length; i++) {
            const { visitor } = this.datas[i]
            const x = (Math.cos(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.animateProcess) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * visitor / this.maxValue * 220 * this.animateProcess) + this.center
            const path = new Path2D()
            path.arc(x, y, 4, 0, Math.PI * 2)

            this.ctx.fill(path)
            this.pointPaths.push(path)
        }
    }

    renderWidthAnimation() {
        if(this.animateProcess >= 1) return
        this.pointPaths = []
        this.animateProcess = Math.min(1, this.animateProcess + 0.05)

        this.ctx.clearRect(0,0,this.size,this.size)
        requestAnimationFrame(this.renderWidthAnimation.bind(this))
        this.render()
    }

    ceil(number, unit = 10000) {
        return Math.ceil(number / unit) * unit
    }

    tooltip({offsetX, offsetY}) {
        for(let i=0; i<this.pointPaths.length; i++) {
            const pointPath = this.pointPaths[i]

            if(this.ctx.isPointInPath(pointPath, offsetX, offsetY)) {
                $('#modal').html(`
                    <div>${this.datas[i].name}</div>
                    <div>${this.datas[i].visitor}명</div>
                `)
                $('#modal').css({
                    left : offsetX,
                    top : offsetY,
                    display : 'block'
                })
                $('#modal').show()
                return
            }
        }
        $('#modal').hide()
    }

}

window.onload = () => {
    new Radial()
}