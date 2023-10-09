import Map from "./Map.js"
import Sidebar from "./Sidebar.js"
import Chart from "./chart/Chart.js"

class App {
    constructor() {
        this.canvas = document.querySelector("#map")
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
        $('.distance-btn').click(e=> {
            let distance = e.target.dataset.idx
            this.map.render(distance, true)

            $('.distance-btn').removeClass('active')
            $(e.target).addClass('active')
        })

        $('#open-btn').click(()=> {
            new Chart()
        })

        $('#btn-zone > button').click((e)=> {
            Sidebar.sidebarAdd(e.target.dataset.json)
        })

        $('#side-list tbody').click((e)=> {
            Sidebar.removeList(e)
        })
    }
    
}

window.onload = () => {
    new App()
}