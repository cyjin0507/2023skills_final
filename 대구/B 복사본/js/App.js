import Map from "./Map"
import Sidebar from "./Sidebar"

class App {
    constructor() {
        this.canvas = document.querySelector('#map')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 800
        
        this.init()
    }

    async init() {
        this.data = (await $.getJSON('/json/attraction.json'))['data']
        this.map = new Map(this.ctx, this.data)

        this.addEvent()
    }

    addEvent() {
        $('.distance-btn').click(e=> {
            let distance = e.target.dataset.index
            this.map.render(distance, true)
        })

        $('#open-btn').click(()=> {
            new Chart()
        })

        $('#side-list tbody').click((e)=> {
            Sidebar.removeList(e)
        })

        $('#btn-zone button').click((e)=> {
            Sidebar.sidebarAdd(e.target.dataset.json)
        })

    }

}

window.onload = () => {
    new App()
}