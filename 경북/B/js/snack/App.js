class App {
    constructor() {
        // $('#game-start-btn').click(()=> {
        //     this.name = $('#name').val()
        //     console.log($('#name').val());
        // })
        this.init()
    }

    init() {
        $('#modal-name').html(this.name)

        $('#start-content').fadeOut()
        $('#game-content').fadeIn()
        this.game = new Game()
        this.timer()
        this.addEvent()
    }

    addEvent() {
        $('#pause-btn').click(this.pause.bind(this))
        $('#play-btn').click(this.play.bind(this))
        $('#reset-btn').click(this.reset.bind(this))
    }

    pause() {
        $('#pause-btn').css('display', 'none')
        $('#play-btn').css('display', 'inline')
        clearInterval(this.timer)
        this.game.pause()
    }

    play() {
        $('#pause-btn').css('display', 'inline')
        $('#play-btn').css('display', 'none')
        this.timer = setInterval(this.timerProcess.bind(this),1000)
        this.game.play()
    }

    reset() {
        clearInterval(this.timer)
        this.leftTime = 179
        $('#time').html('3분')
        this.timer = setInterval(this.timerProcess.bind(this),1000)
        this.game.reset()
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
            this.game.gameEndFunc()
        }
    }

}

new App()