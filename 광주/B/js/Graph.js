class Graph {
    constructor(data, name) {
        this.data = data
        this.name = name
        this.init()
    }

    init() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")

        this.colorList = ['aquamarine','blueviolet','yellowgreen','brown','steelblue','slategray','seagreen','tomato']

        this.setGraph()
    }

    setGraph() {
        this.barWidth = 40
        this.barSpacing = 20
        this.startX = 80
        this.startY = this.canvas.height - 50
        this.maxValue = Math.max(...this.data)

        this.drawGraph()
    }

    drawGraph() {
        for (var i = 0; i < this.data.length; i++) {
            var barHeight = (this.data[i] / this.maxValue) * (this.canvas.height - 100)

            this.ctx.fillStyle = this.colorList[i]
            this.ctx.fillRect(this.startX, this.startY - barHeight, this.barWidth, barHeight)

            this.ctx.fillText(this.name[i], 30, 18 + 20 * i)
            this.ctx.rect(10,10 + 20 * i,10,10)
            this.ctx.fill()

            this.startX += this.barWidth + this.barSpacing
        }
    }

}
