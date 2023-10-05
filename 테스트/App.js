import Map from "./Map"

class App {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 800

        this.init()
    }

    async init() {
        this.data = await $.getJSON('')
        this.map = new Map(this.ctx, this.data)


        this.addEvent()
    }

    addEvent() {
        $('').click(e=> {
            let distance = e.target.dataset.distance
            this.map.render(distance, true)
        })

        $('').click(()=> {
            let sendData = this.map.val()
        })
    }

}