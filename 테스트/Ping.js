export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.newCanvas = document.createElement('canvas')
        this.newCanvas.width = this.ctx.canvas.width
        this.newCanvas.height = this.ctx.canvas.height
        this.btx = this.newCanvas.getContext('2d')

        this.startX = 0
        this.startY = 0

        this.topX = 0
        this.topY = 0

        this.pos = []

        this.dragging = false

        this.distance = 0
        this.distanceArr = []

    }

    click(e, startX, startY, size) {
        let bSize = size
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.dragging = true
        
        this.pos.push({
            x : (e.offsetX - startX) / size,
            y : (e.offsetY - startY) / size,
        })

        this.startX = e.offsetX
        this.startY = e.offsetY

        this.topX = startX
        this.topY = startY

        this.distanceArr.push(this.distance)

        this.savePing(bSize, startX, startY)
        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas,0,0)
    }

    mousemove(e, size) {
        if(!this.dragging) return
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.nowX = e.offsetX
        this.nowY = e.offsetY

        this.size = size

        this.render()
    }

    render() {
        this.ctx.clearRect(0,0,800,800)
        this.ctx.drawImage(this.btx.canvas,0,0)
        this.ctx.setLineDash([10])

        this.ctx.beginPath()
        this.ctx.arc(this.nowX, this.nowY, 10, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(this.nowX, this.nowY)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    savePing(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.ctx.setLineDash([0])

        this.pos.forEach(x=> {
            this.ctx.beginPath()
            this.ctx.arc((x.x*size)+startX,(x.y*size)+startY,10,0,Math.PI*2)
            this.ctx.fill()
            this.ctx.closePath()
        })

        this.ctx.beginPath()
        this.pos.forEach((x,i)=> {
            if(i==0) {
                this.ctx.moveTo((x.x*size)+startX,(x.y*size)+startY)
            } else {
                this.ctx.lineTo((x.x*size)+startX,(x.y*size)+startY)
            }
        })
        this.ctx.stroke()
        this.ctx.closePath()

        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas,0,0)
    }

    close(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.dragging = false

        let lastPos = this.pos[this.pos.length-1]

        this.btx.beginPath()
        this.btx.arc((lastPos.x*size)+startX,(lastPos.y*size)+startY,10,0,Math.PI*2)
        this.btx.fill()
        this.btx.closePath()

        this.ctx.drawImage(this.btx.canvas,0,0)
    }

    update(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
 
        this.startX = (this.pos[this.pos.length-1].x * size) + startX
        this.startY = (this.pos[this.pos.length-1].y * size) + startY

        this.savePing(size, startX, startY)
        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas,0,0)
    }

    undo(startX, startY) {
        if(this.pos.length < 1) {return}
        this.pos.pop()
        this.distanceArr.pop()

        let bSize = this.size==1 ? 0 : (this.size==2 ? 1 : 0)
        this.savePing(bSize,startX,startY)        
    }

    reset() {
        this.startX = 0
        this.startY = 0
        this.topX = 0
        this.topY = 0
        this.distance = 0
        this.distanceArr = []
        this.pos = [] 
    }

    tooltip(x=this.nowX, y=this.nowY) {
        $('.tooltip').css({
            display : 'block',
            left : `${x+30}px`,
            top : `${y+30}px`,
        })

        if(x==-30) {
            $('.tooltip').html(`
                총거리 : ${this.totalDistance()}km
            `)
        } else {
            $('.tooltip').html(`
                상대거리 : ${this.recentDistance()}km
            `)
        }

    }

    recentDistance() {
        let minLat = 0
        let minLong = 0
        let maxLat = 0
        let maxLong = 0

        let latToKm = (maxLat - minLat) / 0.1 * 11 / this.ctx.canvas.width
        let longToKm = (maxLong - minLong) / 0.1 * 8.9 / this.ctx.canvas.height

        let widthTokm = Math.abs(((this.pos[this.pos.length-1].x * this.size)+this.topX)*latToKm - (this.nowX*latToKm)) / this.size
        let heightTokm = Math.abs(((this.pos[this.pos.length-1].y * this.size)+this.topY)*longToKm - (this.nowY*longToKm)) / this.size

        let distance = Math.sqrt(Math.pow(widthTokm,2) + Math.pow(heightTokm,2))
        distance = distance.toFixed(2)

        this.distance = distance
        return distance
    }

    totalDistance() {
        let total = 0
        this.distanceArr.forEach(x=> {
            total+=parseInt(x)
        })
        return total
    }

}