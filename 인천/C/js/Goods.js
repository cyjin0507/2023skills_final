class Goods {
    constructor() {
        this.init()
    }

    async init() {
        this.goods = await $.getJSON('/goods/get')
    
        this.drawList()

    }

    drawList() {
        $('tbody').html('')

        this.goods.forEach(x=> {
            $('tbody').append(`
            <tr>
                <td><img src="/imgs/${x.img}" alt=""></td>
                <td>${x.name}</td>
                <td>${x.price}</td>
                <td>
                    <input type="number" data-idx="${x.idx}" data-price="${parseInt(x.price.replace(',', '').replace('원', ''))}" data-max="${x.stock}" min="0" value="0" class="form-control" style="width: 120px; margin:auto;">
                </td>
                <td class="price">0원</td>
                <td>${x.stock}개</td>
                <td><button class="btn btn-primary basket-btn">장바구니 담기</button></td>
            </tr>
            `)
        })

        this.addEvent()
    }

    addEvent() {
        this.input = $('input[type="number"]')
        this.basket = $('.basket-btn')

        this.input.on('change', (e)=> {
            let price = e.target.dataset.price
            $(e.target.closest('tr')).children('.price').html(`${(price * e.target.value).toLocaleString()}원`)
        })


        this.basket.click(this.basketInsert.bind(this))

    }

    async basketInsert(e) {
        let input = $($($(e.target.closest('tr')).children()[3]).children('input')[0])
        let count = input.val()
        let stock = input[0].dataset.max
        let price = input[0].dataset.price
        let idx = input[0].dataset.idx

        if(count > stock) {
            input.val(stock)
            count = stock
            $($(e.target.closest('tr')).children('.price')).html(`${(stock * price).toLocaleString()}원`)
        }

        if(count == 0) {
            alert("구입 수량을 확인하세요.")
            return
        }

        const response = await $.ajax({
            url:"/goods/purchase",
            type:"POST",
            data: JSON.stringify({
                "idx": idx,
                "count" : count
            })
        });

        if(response) {
            this.init()
            alert("장바구니에 상품이 담겼습니다.")
        }

    }

}

new Goods()