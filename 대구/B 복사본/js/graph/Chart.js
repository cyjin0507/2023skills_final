export default class Chart {
    constructor(data, category) {
        this.data = data
        this.category = category

        this.canvas = document.querySelector('#chart')
        this.ctx = this.canvas.getContext('2d')

        this.size = 500
        this.chartSize = 220
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.category.length

        this.ctx.textAlign = 'center'
        this.ctx.lineWidth = 3
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

        this.count = 5

        this.init()
    }

    async init() {
        this.maxValue = 100
        this.gap = 20

        this.labelKr = (await $.getJSON('/json/attraction.json'))['labels_kr']
        this.drawOutLine()

        for(let i=0; i<this.data.length; i++) {
            this.drawChart(i)
        }
    }

    drawOutLine() {
        this.ctx.fillStyle = 'black'
        this.ctx.strokeStyle = 'black'

        for(let i=0; i<=this.count; i++) {
            this.ctx.beginPath()
            for(let j=0; j<=this.category.length; j++) {
                const x = Math.cos(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i) + this.center
                const y = Math.sin(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i) + this.center

                if(j==0) {
                    this.ctx.moveTo(x,y)
                    this.ctx.fillText(this.gap * i,x,y)
                } else {
                    this.ctx.lineTo(x,y)
                }

                if(i==this.count && j<this.category.length) {
                    this.ctx.fillText(this.labelKr[i],x,y)
                }
            }
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    drawChart(index) {
        let color = '#' + Math.round(Math.random() * 0xffffff).toString(16)
        this.ctx.fillStyle = color
        this.ctx.strokeStyle = color
        this.ctx.globalAlpha = 0.5

        this.ctx.beginPath()
        for(let i=0; i<=this.category.length; i++) {
            const value = this.data[index][this.category[i]] || this.data[index][this.category[0]]
            const x = Math.cos(this.radian * i - Math.PI / 2) * (value / this.maxValue * 220) + this.center
            const y = Math.sin(this.radian * i - Math.PI / 2) * (value / this.maxValue * 220) + this.center

            if(i==0) {
                this.ctx.moveTo(x,y)
                $(`#list > div[data-list="${this.data[index].name}"]`).css({
                    'color' : 'white',
                    'background-color' : color
                })
            } else {
                this.ctx.lineTo(x,y)
            }
        }
        this.ctx.fill()
        this.ctx.globalAlpha = 1
        this.ctx.stroke()
        this.ctx.closePath()
    }

}