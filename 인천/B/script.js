class App {
    constructor() {
        this.init()
    }

    async init() {
        this.list = await $.getJSON('/json/list.json')

        this.setTourList()
    }

    setTourList() {
        $('#tour-list').html('')
        this.list.place.forEach(x=> {
            $('#tour-list').append(`
                <option value="${x.name}">${x.name}</option>
            `)
        })
    }

}

new App()