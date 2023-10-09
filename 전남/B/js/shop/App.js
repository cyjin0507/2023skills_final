import Hodu from "./Hodu.js"

class App {
    constructor() {
        this.init()
    }

    async init() {
        this.data = (await $.getJSON('/json/specialties.json'))['data']
        this.drawList()

        $('.close').click(()=> {
            $('#hodu').hide()
            $('#modal').fadeOut()
        })
    }

    drawList() {
        $('#shop-main').html('')

        this.data.forEach(x=> {
            $('#shop-main').append(`
                <div class="goods">
                    <img src="/image/명물/${x.image}" alt="">
                    <div data-name="${x.name}" class="basket-btn">장바구니 담기</div>
                </div>
            `)  
        })

        $('.basket-btn').click(this.modalOpen.bind(this))
    }

    modalOpen(e) {
        let name = e.target.dataset.name
        let findData = this.data.find(x=>x.name==name)

        if(findData.name == "호두과자") {
            $('#hodu').show()
            new Hodu()
        }

        $('#goods-name').html(findData.name)
        $('#goods-introduce').html(findData.description)
        $('#goods-point').html(findData.point)

        $('#modal').fadeIn()
    }



}

window.onload = () => {
    new App()
}