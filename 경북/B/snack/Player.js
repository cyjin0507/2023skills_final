export default class Player {
    constructor(ctx, x, y, width, height, index) {
        this.ctx = ctx
        this.x = x * ctx.canvas.width / 30
        this.y = y * ctx.canvas.width / 30
        this.width = width
        this.height = height
        this.index = index

        this.keyCheck = false
        this.count = 0
        this.forward = 'down'

        this.loc = "y"
        this.plus = 1
        this.changeCheck = false

        document.addEventListener('keydown', this.keydownEvent)
        document.addEventListener('keyup', this.keyupEvent)

        this.render()
    }

    keydownEvent = (e) => {
        if(this.keyCheck) {return}
        this.keyCheck = true

        if(e.keyCode == 39) {this.forward = 'right'}
        else if(e.keyCode == 37) {this.forward = 'left'}
        else if(e.keyCode == 38) {this.forward = 'up'}
        else if(e.keyCode == 40) {this.forward = 'down'}
        this.count = 0
    }

    keyupEvent = (e) => {
        this.keyCheck = false
    }

    render() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(d) {
        let speed = 35
        if(this.loc == "x") {
            this.x += d * speed * this.plus
        } else if(this.loc == "y") {
            this.y += d * speed * this.plus
        }

        if(this.count == this.index) {
            if(!this.changeCheck) {
                console.log(this.count, this.index);

                if(this.forward == 'left') {this.loc = "x"; this.plus=-1;}
                else if(this.forward == 'right') {this.loc = "x"; this.plus=1;}
                else if(this.forward == 'down') {this.loc = "y"; this.plus=1;}
                else if(this.forward == 'down') {this.loc = "y"; this.plus=1;}
            }
            this.changeCheck = true
        } else {
            this.changeCheck = false
        }

        if(Math.floor(this.y) % 20 == 0) {
            // console.log(this.index, this.count);
            this.count++
        }

    }


}