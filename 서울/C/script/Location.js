class Location {
    constructor(date) {
        this.date = date
        this.init()
    }

    async init() {
        this.data = await $.getJSON(`/reserv/get/${this.date}`)
        $('#location > div').css('background-color', 'white')

        this.reservArr = []
        this.reservDraw()

        this.nowClick = 0
        this.addEvent()
    }

    addEvent() {
        $('#location > div').click(this.locationClick.bind(this))
    }

    locationClick(e) {
        let index = e.target.dataset.idx
        if(this.reservArr.includes(index)) {return}

        $(`#location > div[data-idx=${this.nowClick}]`).css('background-color', 'white')

        this.nowClick = index

        $('#cidx').val("a" + index)
        $(e.target).css('background-color', 'pink')
    }

    reservDraw() {
        if(this.data.length <= 0) {return}
        this.data.forEach(x=> {
            let index = x.cidx.replace(x.cidx.slice(0, 1), '')
            $(`#location > div[data-idx="${index}"]`).css('background-color', '#aaa')
            this.reservArr.push(index)
        })

    }

}