import Map from "./Map.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 800

        this.mouseDown = false

        this.map = new Map(this.ctx)

        this.addEvent()
    }

    addEvent() {
        $('.distance-btn').click((e)=> {
            $('.distance-btn').removeClass('active')
            $(e.target).addClass('active')
            this.map.render(e.target.dataset.distance)
        })
    }

   

}

window.onload = () => {
    new App()
}