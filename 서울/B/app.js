class App {
    constructor() {
        this.init()
    }

    init() {
        this.addEvent()
    }

    addEvent() {
        $('.nav-link').click((e)=> {
            let category = e.target.dataset.category
            this.category(category)
        })
    }

    async category(category) {
        $('.nav-link').removeClass('active')
        $(`.nav-link[data-category='${category}']`).addClass('active')

        this.getData = await $.getJSON('./soap.json')
        this.getData = this.getData.data.filter(x=> x.category == category)
        
        this.drawList()
    }

    drawList() {
        $('#list tbody').html('')

        this.getData.forEach(x=> {
            $('#list tbody').append(`
                <tr>
                    <td><img src="./img/${x.Image}" alt=""></td>
                    <td>${x.soapName}</td>
                    <td>${x.release}</td>
                    <td>${x.price}</td>
                    <td><button class="btn btn-primary">상세보기</button></td>
                    <td><button class="btn btn-primary basket-btn" data-name="${x.soapName}">장바구니</button></td>
                </tr>
            `)
        })

        // event
        $('.basket-btn').click((e)=> {
            console.log(e.target.dataset.name);
        })

    }

}

new App()