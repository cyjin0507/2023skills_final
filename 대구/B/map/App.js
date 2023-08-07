import Map from "./Map.js"
import Chart from "./chart/Chart.js"

class App {
    constructor() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 800

        this.mouseDown = false

        this.init()
    }

    async init() {
        this.data = await $.getJSON('/json/attraction.json')
        this.map = new Map(this.ctx, this.data)

        this.addEvent()
    }

    addEvent() {
        $('.distance-btn').click((e)=> {
            $('.distance-btn').removeClass('active')
            $(e.target).addClass('active')
            this.map.render(e.target.dataset.distance)
        })

        $('#open-btn').click(()=> {
            let sendData = this.map.val()
            this.chart = new Chart(sendData)
        })

    }
   

}

window.onload = () => {
    new App()
}