export default class Mark {
    constructor(ctx) {
        this.ctx = ctx

        this.minLat = 36.6208
        this.maxLat = 36.9842
        this.minLong = 126.9741
        this.maxLong = 127.4377

        this.markList = []

        this.startX = 0
        this.startY = 0

        this.addEvent()

    }

    draw(size, startX, startY, data) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.markList = []
        data.forEach(x=> {
            let minLat = this.minLat * 10000
            let maxLat = this.maxLat * 10000
            let maxLong = this.maxLong * 10000
            let minLong = this.minLong * 10000

            let percentLong = (800 - ((x.latitude * 10000 - minLat) / (maxLat - minLat)) * 800) * size
            let percentLat = (((x.longitude * 10000 - minLong) / (maxLong - minLong)) * 800) * size

            this.markList.push({
                data : x,
                percent : {lat: percentLat+startX, long: percentLong+startY},
            })
        })

        this.startX = startX
        this.startY = startY

        this.render()
    }

    render() {
        this.markList.forEach(x=> {
            this.ctx.beginPath()
            this.ctx.fillStyle = 'blue'
            this.ctx.arc(x.percent.lat, x.percent.long,4,0,Math.PI*2)
            this.ctx.fillText(x.data.name, x.percent.lat + 10, x.percent.long + 5)
            this.ctx.fill()
            this.ctx.closePath()
        })
    }

    addEvent() {
        this.ctx.canvas.addEventListener('click', this.markToggle)
    }

    markToggle = (e) => {
        let mx = e.offsetX
        let my = e.offsetY

        this.markList.forEach((x,i)=> {
            let lat = Math.round(x.percent.lat)
            let long = Math.round(x.percent.long)
            if((lat-4 <= mx && lat + 4 >= mx) &&
                (long-4 <= my && long + 4 >= my)) {
                    this.drawButton(lat, long, x.data)
                    return false
                }
        })

    }

    drawButton(lat, long, data) {
        $('#btn-zone').css({
            'left': `${lat}px`,
            'top': `${long - 40}px`,
            'display' : 'block'
        })
        $('#btn-zone > button').attr('data-json', JSON.stringify(data))
    }

    val() {
        return this.markList
    }

}