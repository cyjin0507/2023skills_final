export default class Player {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx
        this.x = x * ctx.canvas.width / 30
        this.y = y * ctx.canvas.width / 30
        this.width = width
        this.height = height

        this.moveXY = "y"
        this.upDown = 1

        this.forward = ""

        this.render()
    }

    render() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(d, i, forwardList) {
        let speed = 35
        if(this.moveXY == "y") {
            this.y += d * speed * this.upDown
        } else if(this.moveXY == "x") {
            this.x += d * speed * this.upDown
        }

        if((Math.round(this.y) % 20 == 0 && this.moveXY == "y")
        || (Math.round(this.x) % 20 == 0 && this.moveXY == "x")) {
            if(forwardList[i] == "left") {this.moveXY = "x"; this.upDown = 1;}
            if(forwardList[i] == "right") {this.moveXY = "x"; this.upDown = -1;}
            if(forwardList[i] == "up") {this.moveXY = "y"; this.upDown = -1;}
            if(forwardList[i] == "down") {this.moveXY = "y"; this.upDown = 1;}
        }

    }

    changePos(forward, i) {

    }


}