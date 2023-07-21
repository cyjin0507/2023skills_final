class Bar {
    constructor(data, name) {
        this.data = data
        this.name = name
        this.init()
    }

    init() {
        this.canvas = document.querySelector("#bar")
        this.ctx = this.canvas.getContext("2d")

        this.setGraph()
    }

    setGraph() {
        this.barWidth = 40
        this.barSpacing = 20
        this.startX = 30
        this.startY = this.canvas.height - 50
        this.maxValue = Math.max(...this.data)

        this.drawGraph()
    }

    drawGraph() {
        for (var i = 0; i < this.data.length; i++) {
            var barHeight = (this.data[i] / this.maxValue) * (this.canvas.height - 100)

            if(this.data[i] == this.maxValue) {
                this.ctx.fillStyle = "green"
            } else {
                this.ctx.fillStyle = "blue"
            }
            this.ctx.fillRect(this.startX, this.startY - barHeight, this.barWidth, barHeight)

            this.ctx.fillStyle = 'red'
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.name[i], this.startX + 20, 270)

            this.startX += this.barWidth + this.barSpacing
        }
    }

}
