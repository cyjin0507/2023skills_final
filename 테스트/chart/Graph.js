export default class Graph {
    constructor(data, category) {
        this.data = data
        this.category = category

        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.size = 500
        this.chartSize = 220
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.length

        this.ctx.clearRect(0,0,800,800)
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 3

        this.count = 5

        this.init()
    }

    async init() {
        this.maxValue = 100
        this.gap = 20

        this.labelKr = (await $.getJSON(''))['']
        this.drawOutline()
        
        for(let i=0; i<this.data.length; i++) {
            this.drawChart(i)
        }
    }

    drawOutline() {
        for(let i=0; i<=this.count; i++) {
            this.ctx.beginPath()
            for(let j=0; j<=this.category.length; i++) {
                const x = (Math.cos(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center
                const y = (Math.sin(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center

                if(j==0) {
                    this.ctx.moveTo(x,y)
                    this.ctx.fillText(this.gap * i, x, y)
                } else {
                    this.ctx.lineTo(x,y)
                }

                if(i==this.count && j<this.category.length) {
                    this.ctx.fillText(this.labelKr[j], x, y)
                }
            }
            this.ctx.closePath()
        }
    }

}