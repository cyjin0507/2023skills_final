export default class Ping {
    constructor(ctx) {
        this.ctx = ctx

        this.canvasCopy = document.createElement('canvas')
        this.canvasCopy.width = this.ctx.canvas.width
        this.canvasCopy.height = this.ctx.canvas.height
        this.btx = this.canvasCopy.getContext('2d')

        this.dragging = false
        this.curve = false

        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
    
        this.size = 0

        this.pos = []
    }

    mousedown(e, startX, startY, size) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.dragging = true
        this.pos.push({
            x: (e.offsetX - startX) / size,
            y: (e.offsetY - startY) / size
        })

        this.startX = e.offsetX
        this.startY = e.offsetY

        this.btx.clearRect(0,0,800,800)
        this.btx.drawImage(this.ctx.canvas, 0,0)
        this.ctx.setLineDash([5,10])

        this.dragging = true

    }

    
    mouseup(e) {
        if(!this.dragging) {return}

        this.ctx.setLineDash([])
        this.draw()
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

        this.toolTip()

        this.ctx.arc(this.startX,this.startY,10,0,Math.PI*2)
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(this.nowX, this.nowY)
        this.ctx.stroke()
        this.ctx.closePath()

    }

    savePing(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)

        this.pos.forEach(x=> {
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
    }

    close(size, startX, startY) {
        size = size==0 ? 1 : (size==1 ? 2 : 4)
        this.dragging = false

        let lastPos = this.pos[this.pos.length-1]
        this.btx.fillStyle = 'blue'
        this.btx.arc((lastPos.x*size)+startX, (lastPos.y*size)+startY, 10, 0, Math.PI*2)
        this.btx.fill()
        this.ctx.drawImage(this.btx.canvas, 0, 0)
        // this.btx.clearRect(0,0,800,800)
    }

    reset() {
        this.dragging = false
        this.curve = false

        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
        this.pos = []
    }

    toolTip() {
        // console.log(this.totalDistance(size));
        // console.log(this.recentDistance(size));

        // this.ctx.fillStyle = 'red'
        // this.ctx.fillRect(this.nowX+30,this.nowY+30,100,50)
        // this.ctx.fillStyle = 'blue'

        $('#test').html(`
            총거리 : ${this.totalDistance()} <br>
            상대거리 : ${this.recentDistance()}
        `)
    }

    totalDistance() {
        let minLat = 36.6208
        let maxLat = 36.9842
        let minLong = 36.6208
        let maxLong = 36.9842
        let latToKM = (maxLat - minLat) / 0.1 * 11 / this.ctx.canvas.width
        let longToKM = (maxLong - minLong) / 0.1 * 11 / this.ctx.canvas.height

        let distance = 0
        if(this.pos.length>1) {
            for(let i=0; i<this.pos.length-1; i++) {
                let widthKM = Math.abs(this.pos[i].x*latToKM - this.pos[i+1].x*latToKM) / this.size
                let heightKM = Math.abs(this.pos[i].y*longToKM - this.pos[i+1].y*longToKM) / this.size
                distance += Math.sqrt(Math.pow(widthKM,2) + Math.pow(heightKM,2))
            }   
        }


        let widthKM = Math.abs(this.pos[this.pos.length-1].x*latToKM - this.nowX*latToKM) / this.size
        let heightKM = Math.abs(this.pos[this.pos.length-1].y*longToKM - this.nowY*longToKM) / this.size
        distance += Math.sqrt(Math.pow(widthKM,2) + Math.pow(heightKM,2))

        return distance

    }

    recentDistance() {
        let minLat = 36.6208
        let maxLat = 36.9842
        let minLong = 36.6208
        let maxLong = 36.9842
        let latToKM = (maxLat - minLat) / 0.1 * 11 / this.ctx.canvas.width
        let longToKM = (maxLong - minLong) / 0.1 * 11 / this.ctx.canvas.height

        let widthKM = Math.abs(this.pos[this.pos.length-1].x*latToKM - this.nowX*latToKM) / this.size
        let heightKM = Math.abs(this.pos[this.pos.length-1].y*longToKM - this.nowY*longToKM) / this.size
        let distance = Math.sqrt(Math.pow(widthKM,2) + Math.pow(heightKM,2))

        return distance
    }

    undo() {
        if(this.pos.length > 0) {
            this.pos.pop()
        }
    }

}