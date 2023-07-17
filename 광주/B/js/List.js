class List {
    constructor() {
        this.init()
    }

    async init() {
        this.data = await $.getJSON('/json/history.json')
        this.data = this.list = this.data.data

        this.value = ""
        
        this.drawList()
        this.addEvent()
    }

    addEvent() {
        $('#search').on('keyup', this.search.bind(this))
    }

    search() {
        this.value = $('#search').val()
        if(this.value == "") {
            this.list = this.data
        } else {
            this.list = this.data.filter(x=> x.name.includes(this.value))
        }
        this.drawList()
    }

    drawList() {
        $('tbody').html('')
        this.list.forEach((x,i)=> {
            $('tbody').append(`
                <tr>
                    <td><img src="./img/${x.image}" class="modal-img" data-idx=${i} data-name="${x.name}"></td>
                    <td>${this.highlight(x.name)}</td>
                    <td>${x.address}</td>
                    <td>${x.category}</td>
                </tr>
            `)
        })

        new Vote()
    }

    highlight(name) {
        return name.replaceAll(this.value, `<span style="color:red">${this.value}</span>`)
    }

}

new List()