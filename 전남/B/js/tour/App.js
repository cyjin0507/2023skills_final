import Bar from "./Bar.js";
import Pie from "./Pie.js";
import Map from "./Map.js";

class App {
    constructor() {
        this.typeBtn = $('#type-tab > div')
        $('#pie-area').hide()
        $('#bar-area').show()
        new Bar()

        new Map()
        this.addEvent()
    }

    addEvent() {
        this.typeBtn.click((e)=> {
            let type = e.target.dataset.type
            if(type == "bar") {
                $('#pie-area').hide()
                $('#bar-area').show()
                new Bar()
            } else {
                $('#pie-area').show()
                $('#bar-area').hide()
                new Pie()
            }
            this.typeBtn.removeClass('active')
            $(e.target).addClass('active')
        })
    }

}

window.onload = () => {
    new App()
}