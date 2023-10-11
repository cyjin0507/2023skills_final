export default class Bar {
    constructor() {
        this.canvas = document.querySelector('#bar')
        this.ctx = this.canvas.getContext('2d')

        this.placeTab = $('#place-tab > div')
        this.dayTab = $('#day-tab > div')

        this.init()
    }

    async init() {
        this.data = await $.getJSON('/json/rush_hour_visitors.json')

        this.graphData
        this.place = 0
        this.day = 0

        this.frame = 0
        this.pointList = []

        this.addEvent()
        this.dataSet()
    }

    addEvent() {
        this.placeTab.click(this.placeChange.bind(this))
        this.dayTab.click(this.dayChange.bind(this))

        this.canvas.addEventListener('mousemove', this.onmousedown.bind(this))
    }

    placeChange(e) {
        let index = e.target.dataset.index
        this.place = index
        this.placeTab.removeClass('active')
        $(e.target).addClass('active')
    }

    dayChange(e) {
        let index = e.target.dataset.index
        this.day = index
        this.dayTab.removeClass('active')
        $(e.target).addClass('active')
    }

    dataSet() {
        this.graphData = this.data.landscapes[this.place].visitors_per_hour[this.day].data
        this.graphSet()
    }

    graphSet() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

        this.key = Object.keys(this.graphData)
        this.value = Object.values(this.graphData)
        this.maxValue = this.ceil(Math.max(...this.value)) + 100

        this.startX = 100
        this.startY = 0
        this.endX = this.canvas.width - 100
        this.endY = this.canvas.height - 60

        this.barSpacing = 20
        this.barWidth = (this.endX - this.startX) / this.key.length - this.barSpacing

        this.xAxis()
        this.yAxis()

        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    xAxis() {
        for(let i=0; i<this.key.length; i++) {
            this.ctx.fillText(this.key[i],this.startX, this.endY+20)
            this.startX += this.barSpacing + this.barWidth
        }
        this.startX = 100
    }

    yAxis() {
        let height = (this.endY - this.startY) / (this.maxValue / 100)
        for(let i=1; i<=(this.maxValue / 100); i++) {
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
            const path = new Path2D()

            let barHeight = (this.value[i] / this.maxValue) * this.endY

            this.ctx.beginPath()
            this.ctx.fillRect(this.startX, this.endY - (barHeight * this.frame), this.barWidth, barHeight * this.frame)
            this.ctx.fill()
            this.ctx.closePath()

            path.rect(this.startX, this.endY - (barHeight * this.frame), this.barWidth, barHeight * this.frame)
            this.pointList.push(path)

            this.startX += this.barSpacing + this.barWidth
        }
    }

    animation() {
        if(this.frame >= 1) {
            this.startX = 100
            this.render()
            this.frame = 0
            return
        }

        this.frame = Math.min(1, this.frame + 0.1)
        this.startX = 100
        this.render()
        requestAnimationFrame(this.animation.bind(this))
    }

    onmousedown({offsetX, offsetY}) {
        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                $('.tooltip').css({
                    display : 'block',
                    left : `${offsetX + 10}px`,
                    top : `${offsetY + 10}px`,
                })

                $('.tooltip').html(`
                    ${this.key[index]} <br>
                    ${this.key[index]} ${this.value[index]}명
                `)

                break
            } else {
                $('.tooltip').hide()
            }
        }
    }

    ceil(number, unit=100) {
        return Math.ceil(number / unit) * unit
    }

}