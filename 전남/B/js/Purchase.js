class Purchase {
    constructor() {
        this.init()
    }

    async init() {
        this.data =  await $.getJSON('/json/specialties.json')
        this.data = this.data.data
        this.drawList()
        this.addEvent()
    }

    drawList() {
        $('#list-grid').html('')
        this.data.forEach(x=> {
            $('#list-grid').append(`
                <div class="goods">
                    <img src="/resources/명물/${x.image}" alt="">
                    <button class="btn btn-primary basket-btn" data-name="${x.name}">장바구니담기</button>
                </div>
            `)
        })

        $('.basket-btn').click(this.modalOpen.bind(this))
    }

    modalOpen(e) {
        let findData = this.data.find(x=>x.name==e.target.dataset.name)

        $('.modal-header').html(findData.name)
        $('.introduce').html(findData.description)
        $('.price').html(findData.point)

        $('.modal').fadeIn()
    }

    addEvent() {
        $('.close').click(()=> {
            $('.modal').fadeOut()
        })
    }

}

window.onload = () => {
    new Purchase()
}