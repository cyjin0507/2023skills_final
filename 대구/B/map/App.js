import Map from "./Map.js"

class App {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 800

        this.init()
    }

    async init() {
        this.data = await $.getJSON('/json/attraction.json')
        this.map = new Map(this.ctx, this.data)

        this.addEvent()
    }

    addEvent() {

    }

}

window.onload = () => {
    new App()
}