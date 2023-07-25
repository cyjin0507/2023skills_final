class Location {
    constructor(date) {
        this.date = date
        this.init()
    }

    async init() {
        this.data = await $.getJSON(`/reserv/get/${this.date}`)
        $('.location > div').css('background-color', 'white')

        this.reservArr = []
        this.reservDraw()

        this.nowClick = 0
        this.addEvent()
    }

    addEvent() {
        $('.location > div').click(this.locationClick.bind(this))
    }

    locationClick(e) {
        let index = e.target.dataset.idx
        if(this.reservArr.includes(index)) {return}

        $(`.location > div[data-idx=${this.nowClick}]`).css('background-color', 'white')

        this.nowClick = index

        $('#cidx').val(index)
        $(e.target).css('background-color', 'pink')
    }

    reservDraw() {
        if(this.data.length <= 0) {return}
        this.data.forEach(x=> {
            $(`.location > div[data-idx="${x.cidx}"]`).css('background-color', '#aaa')
            this.reservArr.push(x.cidx)
        })

    }

}