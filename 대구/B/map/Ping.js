export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.canvasCopy = document.createElement('canvas')
        this.canvasCopy.width = this.ctx.canvas.width
        this.canvasCopy.height = this.ctx.canvas.height
        this.btx = this.canvasCopy.getContext('2d')

        this.dragging = false
        this.spaceKey = false

        this.startX = 0
        this.startY = 0

        this.topX = 0
        this.topY = 0
    
        this.size = 0

        this.pos = []

        this.distance = 0
        this.distanceArr = []
    }

    click(e, startX, startY, size) {
        let bSize = size
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.dragging = true
        this.pos.push({
            x: (e.offsetX - startX) / size,
            y: (e.offsetY - startY) / size
        })

        this.startX = e.offsetX
        this.startY = e.offsetY

        this.topX = startX
        this.topY = startY

        this.distanceArr.push(this.distance)

        this.savePing(bSize, startX, startY)
        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas, 0,0)
    }

    update(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.startX = (this.pos[this.pos.length-1].x*size)+startX
        this.startY = (this.pos[this.pos.length-1].y*size)+startY

        this.topX = startX
        this.topY = startY

        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas, 0,0)
    }

    mousemove(e, size) {
        if(!this.dragging) {return}
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.nowX = e.offsetX
        this.nowY = e.offsetY

        this.size = size
    
        this.draw()
    }

    draw() {
        this.ctx.clearRect(0,0,800,800)
        this.ctx.drawImage(this.btx.canvas,0,0)
        this.ctx.setLineDash([10])

        this.toolTip()

        this.ctx.beginPath()
        this.ctx.arc(this.startX,this.startY,10,0,Math.PI*2)
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

            this.ctx.stroke()
        })
        this.ctx.closePath()
        this.btx.drawImage(this.ctx.canvas, 0,0)
    }

    close(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.dragging = false

        let lastPos = this.pos[this.pos.length-1]
        this.btx.beginPath()
        this.btx.fillStyle = 'blue'
        this.btx.arc((lastPos.x*size)+startX, (lastPos.y*size)+startY, 10, 0, Math.PI*2)
        this.btx.fill()
        this.btx.closePath()
        this.ctx.drawImage(this.btx.canvas, 0, 0)
    
        this.toolTip(-50, -50)
    }

    reset() {
        this.dragging = false

        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
        this.pos = []
    }

    toolTip(x=this.nowX, y=this.nowY) {
        $('#toolTip').css({
            left : x + 50,
            top : y + 50,
            display : 'block'
        })

        if(x==-50) {
            $('#toolTip').html(`
                총거리 : ${this.totalDistance()}km
            `)
        } else {
            $('#toolTip').html(`
                상대거리 : ${this.recentDistance()}km
            `)
        }
    }

    recentDistance() {
        let minLat = 36.6208
        let maxLat = 36.9842
        let minLong = 36.6208
        let maxLong = 36.9842
        let latToKM = (maxLat - minLat) / 0.1 * 11 / this.ctx.canvas.width
        let longToKM = (maxLong - minLong) / 0.1 * 11 / this.ctx.canvas.height
        console.log(this.startX);
        let widthKM = Math.abs(((this.pos[this.pos.length-1].x*this.size)+this.topX)*latToKM - this.nowX*latToKM)
        let heightKM = Math.abs(((this.pos[this.pos.length-1].y*this.size)+this.topY)*longToKM - this.nowY*longToKM)
        let distance = Math.sqrt(Math.pow(widthKM,2) + Math.pow(heightKM,2)) / this.size
        distance = distance.toFixed(2)

        this.distance = distance

        console.log(this.pos);

        return distance
    }

    totalDistance() {
        let total = 0
        this.distanceArr.forEach(x=> {
            total += Number(x)
        })
        return total
    }

    undo(startX, startY) {
        if(this.pos.length > 1) {
            this.pos.pop()
            this.distanceArr.pop()
            let bSize = this.size == 1 ? 0 : (this.size == 2 ? 1 : 2)
            this.update(bSize, startX, startY)
        }
    }

}