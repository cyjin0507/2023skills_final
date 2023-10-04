export default class Bar {
    constructor() {
        this.canvas = document.querySelector('#bar-canvas')
        this.ctx = this.canvas.getContext('2d')

        this.placeTab = $('.place > div')
        this.dayTab = $('.day > div')

        this.init()
    }

    async init() {
        this.data = await $.getJSON('')
        
        this.graphData
        this.place = 0
        this.day = 0

        this.frame = 0
        this.pointList = []

        this.addEvent()
        this.setData()
    }

    addEvent() {
        this.placeTab.click(this.placeChange.bind(this))
        this.dayTab.click(this.dayChange.bind(this))

        this.canvas.addEventListener('mousemove', this.mousemove.bind(this))
    }

    placeChange(e) {
        let idx = e.target.dataset.idx
        this.place = idx
        this.placeTab.removeClass('active')
        $(e.target).addClass('active')

        this.setData()
    }

    dayChange(e) {
        let idx = e.target.dataset.idx
        this.day = idx
        this.dayTab.removeClass('active')
        $(e.target).addClass('active')

        this.setData()
    }

    setData() {
        // this.graphData =
        this.setGraph()
    }

    setGraph() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        
        this.key = Object.keys(this.graphData)
        this.value = Object.values(this.graphData)
        this.maxValue = this.ceil(Math.max(...this.value)) + 100

        this.startX = 100
        this.startY = 0
        this.endX = this.canvas.width - 100
        this.endY = this.canvas.height - 60

        this.barSpacing = 20
        this.barWidth = (this.endX - this.endX) / this.key.length - this.barSpacing

        this.xAxis()
        this.yAxis()

        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    xAxis() {
        for(let i=0; i<this.key.length; i++) {
            this.ctx.fillText(this.key[i], this.startX, this.endY-30)
            this.startX += this.barSpacing + this.barWidth
        }
        this.startX = 100
    }

    yAxis() {
        let height = (this.endY - this.endX) / (this.maxValue / 100)
        for(let i=1; i<=this.maxValue/100; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, height*i)
            this.ctx.lineTo(this.endX, height*i)
            this.ctx.fillText((this.maxValue/100 - i) * 100, 30, height*i)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    render() {
        this.pointList = []
        for(let i=0; i<this.key.length; i++) {
            let barHeight = (this.value[i] / this.maxValue) * this.endY
            this.ctx.beginPath()
            this.ctx.fillRect(this.startX, this.endY - (barHeight*this.frame), this.barWidth, barHeight * this.frame)
            this.ctx.fill()
            this.ctx.closePath()

            const path = new Path2D()
            path.rect(this.startX, this.endY - (barHeight*this.frame), this.barWidth, barHeight * this.frame)
            this.pointList.push(path)

            this.startX += this.barSpacing + this.barWidth
        }
    }

    animation() {
        if(this.frame >= 1 ) {
            this.startX = 100
            this.render()
            this.frame = 0
            return
        }

        this.startX = 100
        this.frame = Math.min(1, this.frame+0.01)
        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    mousemove({offsetX, offsetY}) {
        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                $('.tooltipEl').css({
                    display : 'block',
                    left : `${offsetX + 10}px`,
                    top : `${offsetY + 10}px`,
                })

                $('.tooltipEl').html(`
                    ${this.key[index]} <br>
                    ${this.key[index]} ${this.value[index]}
                `)
                break
            } else {
                $('.tooltipEl').hide()
            }
        }
    }

    ceil(number, unit=100) {
        return Math.ceil(number / unit) * unit
    }

}