class App {
    constructor() {
        this.init()
    }

    init() {
        this.game = new Game()
        this.timer()
        // this.addEvent()
    }

    addEvent() {
        $('#pause-btn').click(this.pause.bind(this))
        $('#play-btn').click(this.play.bind(this))
        $('#reset-btn').click(this.reset.bind(this))
    }

    timer() {
        this.leftTime = 179

        this.timer = setInterval(this.timerProcess.bind(this),1000)
    }

    timerProcess() {
        let min = Math.floor(this.leftTime / 60)
        let sec = this.leftTime % 60

        $('#time').html(`${min}분 ${sec}초`)

        this.leftTime--
        if (this.leftTime < 0) {
            clearInterval(this.timer)
            this.game.gameEnd()
        }
    }

}

new App()