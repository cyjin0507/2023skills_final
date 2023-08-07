export default class Graph {
    constructor(data, category) {
        this.data = data
        this.category = category

        this.canvas = document.querySelector('#chart')
        this.ctx = this.canvas.getContext('2d')

        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 3

        this.size = 500
        this.chartSize = 220
        this.center = this.size / 2
        this.radian = Math.PI * 2 / this.category.length

        this.ctx.textAlign = 'center'
        this.count = 5

        this.colorList = []

        this.init()

    }

    init() {
        this.maxValue = 0

        this.data.forEach(x=> {
            this.category.forEach(j=> {
                if(this.maxValue < x[j]) {
                    this.maxValue = x[j]
                }
            })
        })

        this.gap = Math.round(this.maxValue / this.count)

        this.drawOutLine()

        
        for(let i=0; i<this.data.length; i++) {
            this.drawChart(i)
        }

    }

    drawOutLine() {
        for(let i=0; i<=this.count; i++) {
            this.ctx.beginPath()
            for(let j=0; j<=this.category.length; j++) {
                const x = (Math.cos(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center
                const y = (Math.sin(this.radian * j - Math.PI / 2) * (this.chartSize / this.count * i)) + this.center

                if(j==0) {
                    this.ctx.moveTo(x,y)
                    this.ctx.fillText(i*this.gap,x,y-5)
                } else {
                    this.ctx.lineTo(x,y)
                }

                if(i==this.count && j<this.category.length) {
                    this.ctx.fillText(this.category[j],x,y)
                }

            }


            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    drawChart(index) {
        this.ctx.textAlign = 'center'
        let color = "#" + Math.round(Math.random() * 0xffffff).toString(16)

        this.ctx.beginPath()
        this.ctx.strokeStyle = color
        for(let i=0; i<=this.category.length; i++) {
            const value = this.data[index][this.category[i]] || this.data[index][this.category[0]]
            const x = (Math.cos(this.radian * i - Math.PI / 2) * value / this.maxValue * 220) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * value / this.maxValue * 220) + this.center

            if(i==0) {
                this.ctx.moveTo(x,y)
            } else {
                this.ctx.lineTo(x,y)
            }
        }

        this.ctx.lineWidth = 3
        this.ctx.stroke()

        this.ctx.closePath()


        for(let i=0; i<this.data.length; i++) {
            this.ctx.beginPath()
            this.ctx.fillStyle = color

            const value = this.data[index][this.category[i]] || this.data[index][this.category[0]]
            const x = (Math.cos(this.radian * i - Math.PI / 2) * value / this.maxValue * 220) + this.center
            const y = (Math.sin(this.radian * i - Math.PI / 2) * value / this.maxValue * 220) + this.center

            this.ctx.arc(x,y,4,0,Math.PI*2)
            this.ctx.fill()
            this.ctx.closePath()

        }

        this.ctx.textAlign = 'left'
        this.ctx.moveTo(30,15*(index+1) + 400)
        this.ctx.lineTo(50,15*(index+1) + 400)
        this.ctx.stroke()
        this.ctx.fillText(this.data[index].name, 55, 15*(index+1) + 400)

    }

}