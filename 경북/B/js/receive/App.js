class App {
    constructor() {
        $('#game-start-btn').click(()=> {
            this.name = $('#name').val()
        })
        this.init()
    }

    init() {
        $('#modal-name').html(this.name)

        this.game = new Game()
        this.timer()
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