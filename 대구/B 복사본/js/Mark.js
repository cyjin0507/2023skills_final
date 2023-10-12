export default class Mark {
    constructor(ctx) {
        this.ctx = ctx

        this.minLat = 36.6208
        this.maxLat = 36.9842
        this.minLong = 126.9741
        this.maxLong = 127.4377

        this.startX = 0
        this.startY = 0

        this.markList = []
        this.pointList = []

        this.addEvent()
    }

    draw(size, startX, startY, data) {
        $('#btn-zone').hide()

        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.markList = []
        this.pointList = []

        data.forEach(x=> {
            let minLat = this.minLat * 10000
            let minLong = this.minLong * 10000
            let maxLat = this.maxLat * 10000
            let maxLong = this.maxLong * 10000

            let percentLat = (800 - (x.latitude * 10000 - minLat) / (maxLat - minLat) * 800) * size
            let percentLong = ((x.longitude * 10000 - minLong) / (maxLong - minLong) * 800) * size

            this.markList.push({
                data : x,
                percent : {lat:percentLat+startX, long:percentLong+startY}
            })
        })

        this.startX = startX
        this.startY = startY

        this.render()
    }

    render() {
        this.markList.forEach(x=> {
            const path = new Path2D()
            path.arc(x.percent.lat, x.percent.long, 4,0,Math.PI*2)

            this.ctx.beginPath()
            this.ctx.fillText(x.data.name, x.percent.lat + 5, x.percent.long + 5)
            this.ctx.fill(path)
            this.ctx.closePath()

            this.pointList.push(path)
        })
    }

    addEvent() {
        this.ctx.canvas.addEventListener('click', this.markToggle.bind(this))
    }

    markToggle({offsetX, offsetY}) {
        for(const index in this.pointList) {
            const path = this.pointList[index]
            if(this.ctx.isPointInPath(path, offsetX, offsetY)) {
                $('#btn-zone').css({
                    display : 'block',
                    left : `${offsetX+5}px`,
                    top : `${offsetY+5}px`,
                })

                $('#btn-zone > button').attr('data-json', JSON.stringify(this.markList[index].data))
                break
            } else {
                // $('#btn-zone').hide()
            }
        }
    }

    val() {
        return this.markList
    }
}