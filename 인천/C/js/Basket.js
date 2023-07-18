class Basket {
    constructor() {
        this.init()
    }

    async init() {
        this.basket = await $.getJSON('/basket/get')
        this.idxArr = []
    
        this.drawList()

    }

    drawList() {
        $('tbody').html('')

        this.basket.forEach(x=> {
            this.idxArr.push({
                "idx" : x.idx,
                "count" : x.count
            })
            $('tbody').append(`
            <tr>
                <td><img src="/imgs/${x.img}" alt=""></td>
                <td>${x.name}</td>
                <td>${x.price}</td>
                <td>
                    <input type="number" value="${x.count}" data-idx="${x.idx}" data-price="${parseInt(x.price.replace(',', '').replace('원', ''))}" data-max="${x.stock}" min="0" value="0" class="form-control" style="width: 120px; margin:auto;">
                </td>
                <td class="price">${(x.count * x.price.replace(',','').replace('원','')).toLocaleString()}원</td>
                <td>${x.stock}개</td>
            </tr>
            `)
        })
        
        console.log(this.idxArr);

        this.addEvent()
    }

    addEvent() {
        this.input = $('input[type="number"]')

        this.input.on('change', (e)=> {
            let price = e.target.dataset.price
            $(e.target.closest('tr')).children('.price').html(`${(price * e.target.value).toLocaleString()}원`)

            this.idxArr.filter(x=> x.idx==e.target.dataset.idx)[0].count = e.target.value
        })

        $('#order-btn').click(this.order.bind(this))

        $('#reset-btn').click(this.reset.bind(this))
    }

    async reset() {
        const response = await $.ajax({
            url: "/basket/reset",
            type: "POST"
        })
        if(response) {
            this.init()
        }
    }
    
    async order() {

        const response = await $.ajax({
            url:"/order/process",
            type:"POST",
            data: JSON.stringify({
                "idx" : JSON.stringify(this.idxArr)
            })
        });

        if(response) {
            alert('주문을 성공적으로 완료했습니다.')
            this.init()
        }
    }

}

new Basket()