class App {
    constructor() {
        this.init()
    }

    init() {
        // new Game()
        this.timer()
    }

    timer() {
        let min = 0
        let sec = 1
        setInterval(()=> {
            if(min > 0) {
                $('#time').html(`${min}분 ${sec}초`)
            } else {
                $('#time').html(`${sec}초`)
            }
            sec++
            if(sec >= 60) {
                sec = 0
                min++
            }
        },1000)
    }

}

new App()