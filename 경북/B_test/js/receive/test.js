class Game {
    constructor() {
        this.itemList = ['car', 'grape', 'knife', 'pan', 'walnut-cookie']
        this.itemImgList = []

        this.score = 0
        this.crushCheck = false
        this.end = false

        this.init()
    }

    init() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.itemPosList = []

        this.addEvent()

        this.charactorControl()

        this.itemSetting()

    }

    itemSetting() {
        for(let i=0; i<this.itemList.length; i++) {
            const itemImg = new Image()
            itemImg.src = `./resources/imgs/game/${this.itemList[i]}.png`
            this.itemImgList.push(itemImg)
        }
        this.itemControl()
    }

    itemControl() {
        let itemRnd = Math.floor(Math.random() * this.itemList.length)

        if(this.itemList[itemRnd] == "car" || this.itemList[itemRnd] == "knife" ||
        this.itemList[itemRnd] == "pan") {
            this.itemCheck = false
        } else {
            this.itemCheck = true
        }
        
        this.itemX = Math.floor(Math.random() * (this.canvas.width - this.itemImgList[itemRnd].width))
        this.animationY = 0

        // this.itemImg.onload = () => {
        requestAnimationFrame(this.animation(itemRnd))
        // }
    }

    animation = (itemRnd) => {
        if(this.end) {return}
        if(this.animationY >= 1) {
            this.itemControl()
            return
        }
        this.animationY = Math.min(1, this.animationY + 0.01)
        requestAnimationFrame(this.animation(itemRnd))
        this.itemMove(itemRnd)
    }

    itemMove(itemRnd) {
        this.crush()

        console.log(this.itemImgList[0]);

        this.itemY = (this.canvas.height - this.itemImgList[itemRnd].height / 8) * this.animationY
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.charactorDraw()
        this.ctx.drawImage(this.itemImgList[itemRnd], this.itemX, this.itemY, this.itemImgList[itemRnd].width/8, this.itemImgList[itemRnd].height/8)
    }

    crush() {
        // let itemLeft = this.itemX
        // let itemRight = this.itemX + this.itemImgList[itemRnd].width - 10
        // let charactorLeft = this.charactorPosX
        // let charactorRight = this.charactorPosX + this.charactorWidth

        // if(((itemLeft >= charactorLeft && itemLeft <= charactorRight) ||
        // itemRight >= charactorLeft && itemRight <= charactorRight) &&
        // (this.itemY >= this.charactorPosY)) {
        //     if(this.crushCheck) return
        //     this.crushCheck = true
        //     this.crushFunc()
        // } else {
        //     this.crushCheck = false
        // }

    }

    crushFunc() {
        if(this.itemCheck) {
            this.score++
        } else {
            this.score--
            if(this.score <= 0) {this.gameEnd()}
        }
        $('#score').html(this.score)
    }

    charactorControl() {
        this.charactorImg = new Image();
        this.charactorImg.src = './resources/imgs/game/charactor.png'

        this.charactorWidth = this.charactorImg.width/3
        this.charactorHeight = this.charactorImg.height/3

        this.charactorPosX = this.canvas.width / 2 - this.charactorWidth
        this.charactorPosY = this.canvas.height - this.charactorHeight

        this.charactorImg.onload = () => {
            this.itemPosList.push({
                type : "charactor",
                x : this.charactorPosX,
                y : this.charactorPosY,
                url : this.charactorImg.src
            })
            this.charactorDraw()
        }
    }

    addEvent() {
        $(document).on('keydown', this.charactorMove.bind(this))
    }

    charactorDraw() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.charactorImg, this.charactorPosX, this.charactorPosY, this.charactorWidth, this.charactorHeight)
    }

    charactorMove(e) {
        let keyCode = e.keyCode
        if(keyCode == 39) {
            this.charactorPosX = Math.min(this.charactorPosX+10, this.canvas.width - this.charactorWidth)
        } else if(keyCode == 37) {
            this.charactorPosX = Math.max(this.charactorPosX-10, 0)
        }

        this.itemPosList.filter(x=> x.type=="charactor")[0].x = this.charactorPosX

        this.charactorDraw()
    }

    gameEnd() {
        this.end = true
        $('#modal-score').html(`${this.score}점`)
        $('.modal').fadeIn()
    }

}
