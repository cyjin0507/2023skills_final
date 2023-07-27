class App {
    constructor() {
        this.init()
    }

    init() {
        this.game = new Game()
        this.timer()
        this.addEvent()
    }

    addEvent() {
        $('#pause-btn').click(this.pause.bind(this))
    }

    pause() {
        this.game.pause()
    }

    timer() {
        let leftTime = 179

        const timer = setInterval(()=> {
            let min = Math.floor(leftTime / 60)
            let sec = leftTime % 60

            $('#time').html(`${min}분 ${sec}초`)

            leftTime--
            if(leftTime < 0) {
                clearInterval(timer)
                this.game.gameEndFunc()
            }
        },1000)
    }

}

new App()