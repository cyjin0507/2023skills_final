let CHECK = false

class Game {
    constructor() {
        if(CHECK) {return}
        CHECK = true

        this.frame = 0

        this.posX = 15
        this.posY = 15

        this.length = 5
        this.posArr = []

        // 0 : 아래 / 1 : 위 / 2 : 왼 / 3 : 오
        this.forward = 0
        this.upDown = 0
        this.create = 1

        this.score = 0

        // 아이템 위치
        this.itemLoc()
        // 아이템을 먹었는지 체크 (계속 생성 방지)
        this.itemCheck = false

        // 게임 끝났는지 체크 (계속 생성 방지)
        this.gameEnd = false
        this.crushCheck = false

        // 일시정지 중인지 확인
        this.pauseCheck = false

        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.blockWidth = this.canvas.width / 30

        this.init()
    }

    init() {
        this.blockHeight = this.canvas.height / 30

        this.setting()
        $(document).on('keydown', this.changePos.bind(this))

        this.charactorMove = setInterval(this.autoMove.bind(this), 500)
        this.gameProcess = setInterval(this.game.bind(this), 1000 / 15)
    }

    itemLoc() {
        this.itemPosX = Math.floor(Math.random() * 29) + 1
        this.itemPosY = Math.floor(Math.random() * 29) + 1
        if(this.posArr.find(x=> x.x==this.blockWidth * (this.itemPosX - 1) && x.y==this.blockWidth * (this.itemPosY - 1))) {
            this.itemLoc()
        }
    }

    randomItem() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.blockWidth * (this.itemPosX - 1), this.blockWidth * (this.itemPosY - 1), this.blockWidth, this.blockHeight)
    }

    autoMove() {
        if (this.forward == 0) {
            this.posY++
        } else if (this.forward == 1) {
            this.posY--
        } else if (this.forward == 2) {
            this.posX--
        } else if (this.forward == 3) {
            this.posX++
        }

        this.posArr.pop()
        this.posArr.unshift(
            { x: this.pos.x, y: this.pos.y }
        )
    }

    setting() {
        this.posArr = []
        for (let i = 0; i < 5; i++) {
            this.posX = 15
            this.posY = 15 - i
            this.posArr.push(
                { x: this.pos.x, y: this.pos.y }
            )
        }
        this.posY = 15
    }

    changePos(e) {
        if(this.pauseCheck) {return}

        if (e.keyCode == 38) {
            this.upDown = 1
            this.forward = 1
            this.create = 0
            this.posY--
        } else if (e.keyCode == 39) {
            this.forward = 3
            this.create = 2
            this.posX++
        } else if (e.keyCode == 40) {
            this.forward = 0
            this.upDown = 0
            this.create = 1
            this.posY++
        } else if (e.keyCode == 37) {
            this.forward = 2
            this.create = 3
            this.posX--
        }

        this.posArr.pop()
        this.posArr.unshift(
            { x: this.pos.x, y: this.pos.y }
        )

        clearInterval(this.charactorMove)

        this.charactorMove = setInterval(this.autoMove.bind(this), 500)
    }

    game() {
        // 벽에 박았는지 확인
        if(this.posX >= 31 || this.posX <= 0 || this.posY >= 31 || this.posY <= 0) {
            if(this.gameEnd) {return}
            this.gameEndFunc()
            this.gameEnd = true
            return
        }

        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.blockLine()
        this.randomItem()
        
        for (let i = 0; i < this.posArr.length; i++) {
            this.ctx.fillStyle = i==0 ? "green" : "red"
            this.ctx.fillRect(this.posArr[i].x, this.posArr[i].y, this.blockWidth, this.blockHeight)
        }

        // 아이템 먹었는지 확인
        if(this.posX == this.itemPosX && this.posY == this.itemPosY) {
            if(this.itemCheck) {return}
            this.itemGet()
            this.itemCheck = true
        } else {
            this.itemCheck = false
        }

        // 자기 몸에 박았는지 확인
        const checkArr = this.posArr.slice(1, this.posArr.length)
        if(checkArr.find(x=> x.x==this.pos.x && x.y==this.pos.y)) {
            if(this.crushCheck) {return}
            this.gameEndFunc()
            this.crushCheck = true
        } else {
            this.crushCheck = false
        }
    }

    itemGet() {
        this.itemLoc()
        let stX = this.posX
        let stY = this.posY

        if(this.create == 0) {
            this.posY++
        } else if(this.create == 1) {
            this.posY--
        } else if(this.create == 2) {
            this.posX--
        } else if(this.create == 3) {
            this.posY++
        }
        this.posArr.push(
            { x: this.pos.x, y: this.pos.y }
        )

        this.score++
        $('#score').html(this.score)

        this.posX = stX
        this.posY = stY
    }

    gameEndFunc() {
        clearInterval(this.gameProcess)
        clearInterval(this.charactorMove)

        $('.modal').fadeIn()
        $('#modal-score').html(`${this.score}점`)
    }

    get pos() {
        const returnX = this.blockWidth * (this.posX - 1)
        const returnY = this.blockHeight * (this.posY - 1)

        return { "x": returnX, "y": returnY }
    }

    blockLine() {

        this.ctx.beginPath();
        for (let i = 0; i < 30; i++) {
            this.ctx.moveTo(this.blockWidth * i, 0);
            this.ctx.lineTo(this.blockWidth * i, this.canvas.height);
        }

        for (let i = 0; i < 30; i++) {
            this.ctx.moveTo(0, this.blockHeight * i);
            this.ctx.lineTo(this.canvas.width, this.blockHeight * i);
        }

        this.ctx.stroke();

    }

    pause() {
        this.pauseCheck = true
        clearInterval(this.charactorMove)
        clearInterval(this.gameProcess)
    }

    play() {
        this.pauseCheck = false
        this.charactorMove = setInterval(this.autoMove.bind(this), 500)
        this.gameProcess = setInterval(this.game.bind(this), 1000 / 15)
    }

    reset() {
        clearInterval(this.charactorMove)
        clearInterval(this.gameProcess)

        this.forward = 0
        this.upDown = 0
        this.create = 1

        this.score = 0
        $('#score').html(this.score)
        this.init()
    }

}
