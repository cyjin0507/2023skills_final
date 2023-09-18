class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.width = this.canvas.width
        this.height = this.canvas.height

        this.placeTab = $('.place-tab > div')
        this.dayTab = $('.day-tab > div')

        this.init()
    }

    ceil(number, unit = 100) {
        return Math.ceil(number / unit) * unit
    }

    async init() {
        this.data = await $.getJSON('/json/data.json')

        this.graphData
        this.place = 0
        this.day = 0

        this.frame = 0

        this.setData()
        this.addEvent()
    }

    addEvent() {
        this.placeTab.click(this.placeChange.bind(this))
        this.dayTab.click(this.dayChange.bind(this))
        $(document).on('mousemove', this.mousemove.bind(this))
    }

    placeChange(e) {
        this.place = e.target.dataset.idx

        this.placeTab.removeClass('active')
        $(e.target).addClass('active')

        this.setData()
    }

    dayChange(e) {
        this.day = e.target.dataset.idx

        this.dayTab.removeClass('active')
        $(e.target).addClass('active')
        this.setData()
    }

    setData() {
        this.graphData = this.data.landscapes[this.place].visitors_per_hour[this.day].data

        this.graphSet()
    }

    graphSet() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

        this.key = Object.keys(this.graphData)
        this.value = Object.values(this.graphData)
        this.maxValue = this.ceil(Math.max(...this.value))

        this.startX = 100
        this.startY = 0
        this.endX = this.canvas.width - 100
        this.endY = this.canvas.height - 60

        this.barSpacing = 20
        this.barWidth = (this.endX - this.startX) / this.key.length - this.barSpacing

        this.xAxis()
        this.yAxis()

        this.bar()
        requestAnimationFrame(this.animation.bind(this))
    }

    xAxis() {
        for(let i=0; i<this.key.length; i++) {
            this.ctx.fillText(this.key[i], this.startX, this.endY + 15)
            this.startX += this.barWidth + this.barSpacing
        }
        this.startX = 100
    }

    yAxis() {
        let height = (this.endY - this.startY) / (this.maxValue / 100)
        for(let i=1; i<=this.maxValue / 100; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, height * i)
            this.ctx.lineTo(this.endX, height * i)
            this.ctx.fillText(((this.maxValue / 100) - i) * 100, 40, height*i)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    bar() {
        this.pathList = []
        for(let i=0; i<this.key.length; i++) {
            const path = new Path2D()
            let barHeight = (this.value[i] / this.maxValue) * this.endY
            this.ctx.beginPath()
            this.ctx.fillRect(this.startX, (this.endY-barHeight * this.frame), this.barWidth, barHeight * this.frame)
            this.ctx.fill()
            this.ctx.closePath()

            path.rect(this.startX, (this.endY-barHeight * this.frame), this.barWidth, barHeight * this.frame)
            this.pathList.push(path)

            this.startX += this.barWidth + this.barSpacing
        }
    }

    animation() {
        if(this.frame >= 1) {
            this.startX = 100
            this.bar()
            this.frame = 0
            return
        }
        this.startX = 100
        this.bar()
        this.frame = Math.min(1, this.frame + 0.05)
        requestAnimationFrame(this.animation.bind(this))
    }

    mousemove({offsetX, offsetY}) {
        for(const index in this.pathList) {
            const path = this.pathList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                this.toolTip(index, offsetX, offsetY)
                break
            } else {
                $('.tooltipEl').css('display', 'none')
            }
        }
    }

    toolTip(index, x, y) {
        const time = this.key[index]
        const people = this.value[index]

        $('.tooltipEl').html(`
            <div>${time}</div>
            <div>${time} 방문자 ${people}명</div>
        `)

        $('.tooltipEl').css({
            'display' : 'block',
            'left' : `${x + 10}px`,
            'top' : `${y - 70}px`,
        })
    }

}

window.onload = () => {
    new App()
}