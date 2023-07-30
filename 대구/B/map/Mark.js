export default class Mark {
    constructor(ctx) {
        this.ctx = ctx

        this.minLat = 36.6208
        this.maxLat = 36.9842
        this.minLong = 126.9741
        this.maxLong = 127.4377

        this.markList = []

        this.draw(0)

    }

    async draw(size) {
        this.markList = []
        this.data = await $.getJSON('/json/attraction.json')
        this.data['data'].forEach(x=> {
            let minLat = this.minLat * 10000
            let maxLat = this.maxLat * 10000
            let maxLong = this.maxLong * 10000
            let minLong = this.minLong * 10000

            let percentLong = 800 - ((x.latitude * 10000 - minLat) / (maxLat - minLat)) * 800
            let percentLat = ((x.longitude * 10000 - minLong) / (maxLong - minLong)) * 800

            this.markList.push({
                data : x,
                percent : {lat: percentLat, long: percentLong}
            })
        })

        console.log("--------------");

        this.render()
    }

    render() {
        this.markList.forEach(x=> {
            // console.log(x.percent);
            this.ctx.fillRect(x.percent.lat, x.percent.long,10,10)
        })
    }



}