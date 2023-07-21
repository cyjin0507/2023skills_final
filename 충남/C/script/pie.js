class Pie {
    constructor(data = [], name = []) {
        this.data = data
        this.name = name

        this.init()
    }

    init() {
        this.canvas = document.querySelector('#pie')
        this.ctx = this.canvas.getContext('2d')

        this.setGraph()
    }

    setGraph() {
        this.sw = this.canvas.width
        this.sh = this.canvas.height
        this.padding = 100

        this.colors = ['#7cfc00', '#0000ff', '#ff00ff', '#66cdaa', '#ff1493']

        this.centerX = this.sw/2
        this.centerY = this.sh/2

        this.radius = Math.min(this.sw-(this.padding*2), this.sh-(this.padding*2)) / 2

        this.angle = 0
        this.total = 0

        this.drawGraph()
    }

    drawGraph() {
        for(let i in this.data) {this.total += this.data[i]}

        for(let i=0; i<this.data.length; i++) {
            this.ctx.fillStyle = this.colors[i]
            this.ctx.beginPath()

            this.ctx.moveTo(this.centerX, this.centerY)
            this.ctx.arc(this.centerX, this.centerY, this.radius, this.angle, this.angle + (Math.PI*2*(this.data[i]/this.total)))
            this.ctx.lineTo(this.centerX, this.centerY)
            this.ctx.fill()
            
            this.angle += Math.PI*2*(this.data[i]/this.total)
        }

        this.drawLegend()
    }

    drawLegend() {
        let x = 40
        let y = 250
        for(let i=0; i<this.data.length; i++) {
            this.ctx.fillStyle = this.colors[i]
            this.ctx.fillRect(x, y + i * 20, 10, 10)
            this.ctx.fillText(this.name[i], x + 20, y + i * 20 + 7)
        }
        
    }

}