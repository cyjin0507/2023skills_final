export default class Mark {
    constructor(ctx) {
        this.ctx = ctx

        this.minLat = 36.6208
        this.maxLat = 36.9842
        this.minLong = 126.9741
        this.maxLong = 127.4377

        this.markList = []

        this.init()


    }

    async init() {
        this.data = await $.getJSON('/json/attraction.json')
        this.draw(0,0,0)
    }

    async draw(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.markList = []
        this.data['data'].forEach(x=> {
            let minLat = this.minLat * 10000
            let maxLat = this.maxLat * 10000
            let maxLong = this.maxLong * 10000
            let minLong = this.minLong * 10000
            
            let percentLong = (800 - ((x.latitude * 10000 - minLat) / (maxLat - minLat)) * 800) * size
            let percentLat = (((x.longitude * 10000 - minLong) / (maxLong - minLong)) * 800) * size

            this.markList.push({
                data : x,
                percent : {lat: percentLat+startX, long: percentLong+startY}
            })
        })

        this.render()
    }

    render() {
        this.ctx.beginPath()
        this.markList.forEach(x=> {
            this.ctx.fillStyle = 'blue'
            this.ctx.arc(x.percent.lat, x.percent.long,4,0,Math.PI*2)
            this.ctx.fillText(x.data.name, x.percent.lat + 10, x.percent.long + 5)
            this.ctx.fill()
            this.ctx.closePath()
        })
    }



}