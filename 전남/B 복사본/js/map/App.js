import Bar from "./Bar.js"
import Map from "./Map.js"
import Pie from "./Pie.js"

class App {
    constructor() {
        this.tab = $('#type-tab > div')
        this.addEvent()
        new Bar()
        $('#bar-area').show()
        $('#pie-area').hide()

        new Map()
    }

    addEvent() {
        this.tab.click(e=> {
            let type = e.target.dataset.type
            if(type == "bar") {
                new Bar()
                $('#bar-area').show()
                $('#pie-area').hide()
            } else {
                new Pie()
                $('#bar-area').hide()
                $('#pie-area').show()
            }
            this.tab.removeClass('active')
            $(e.target).addClass('active')
        })
    }

}

window.onload = () => {
    new App()
}