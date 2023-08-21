class App {
    constructor() {
        this.basket = []
        this.init()
    }

    init() {
        this.scrollIndex = 0

        this.addEvent()
    }

    addEvent() {
        $('.nav-link').click((e)=> {
            let category = e.target.dataset.category
            this.category(category)
        })

        $('#buy-btn').click(this.buy.bind(this))

        $('#search-btn').click(this.search.bind(this))

        this.auto = false
        $('#search-val').focus(()=> {
            this.auto = true
        })

        $('#search-val').blur(()=> {
            this.auto = false
            $('#auto-list').fadeOut()
        })
        $('#search-val').on('input', this.autoSearch.bind(this))

        this.keyLoc = 0
        $('body').on('keydown', (e)=> {
            this.selectVal(e)
        })


    }

    async category(category) {
        this.getData = await $.getJSON('./soap.json')
        $('.nav-link').removeClass('active')
        $(`.nav-link[data-category='${category}']`).addClass('active')

        this.getData = this.getData.data.filter(x=> x.category == category)
        this.scrollIndex = 0
        this.drawList()
    }

    drawList() {
        $('#list-container').css('height', '340px')
        if(this.scrollIndex == 0) {
            $('#list tbody').html('')
        }
        let sliceData = this.getData.slice(this.scrollIndex, this.scrollIndex + 4)
        sliceData.forEach(x=> {
            $('#list tbody').append(`
                <tr>
                    <td><img src="./img/${x.Image}" alt=""></td>
                    <td>${x.soapName}</td>
                    <td>${x.release}</td>
                    <td>${x.price}</td>
                    <td><button class="btn btn-primary detail-btn" data-name="${x.soapName}">상세보기</button></td>
                    <td><button class="btn btn-primary basket-btn" data-name="${x.soapName}" data-price="${x.price}">장바구니</button></td>
                </tr>
            `)
        })

        // event
        $('.basket-btn').click((e)=> {
            let product = e.target.dataset
            this.basketInsert(product)
        })

        $('.detail-btn').click((e)=> {
            let product = e.target.dataset
            new Detail(this).open(product)
        })

        let scrollCheck = false
        $('#list-container').on('scroll', (e)=> {
            let scrollTop = $('#list-container').scrollTop()
            let innerHeight = $('#list-container').innerHeight()
            let scrollHeight = $('#list-container').prop('scrollHeight')
            if(scrollTop + innerHeight >= scrollHeight) {
                if(scrollCheck) return
                scrollCheck = true
                $('#loading').fadeIn()
                setTimeout(()=> {
                    scrollCheck = false
                    $('#loading').fadeOut()
                    this.scrollIndex += 4
                    this.drawList()
                },1000)
            }
        })

        
    }

    basketInsert(product) {
        if(this.basket.filter(x=>x.name==product.name).length == 0) {
            this.basket.push({
                "name" : product.name,
                "price" : product.price,
                "count" : 1
            })
        } else {
            this.basket.filter(x=>x.name==product.name)[0].count++
        }
        this.drawBasket()

    }

    drawBasket() {
        $('#basket tbody').html('')
        this.basket.forEach(x=> {
            $('#basket tbody').append(`
                <tr>
                    <td>${x.name}</td>
                    <td>${x.price}</td>
                    <td><input type="number" data-name="${x.name}" class="basket-count form-control" value="${x.count}"></td>
                    <td><button class="btn btn-danger basket-delete" data-name="${x.name}">삭제</button></td>
                </tr>
            `)
        })

        this.basketCount()
        this.basketDelete()
        this.basketTotal()
    }

    basketCount() {
        $('.basket-count').on('change', (e)=> {
            let product = e.target.dataset.name
            let value = $(e.target).val()

            if(value <= 0) {
                $(e.target).val(1)
                return
            }

            this.basket.filter(x=>x.name==product)[0].count = value

            this.basketTotal()
        })
    }

    basketDelete() {
        $('.basket-delete').click((e)=> {
            let product = e.target.dataset.name
            this.basket.forEach((x,i) => {
                if(x.name == product) {
                    this.basket.splice(i, 1)
                }
            })
            this.drawBasket()
        })
    }

    basketTotal() {
        let total = 0

        this.basket.forEach(x=> {
            let price = parseInt(x.price.replace('원', ''))
            total += price * x.count
        })

        $('#total').html(total.toLocaleString())

        if(total > 30000) {
            this.discount(total)
        } else {
            $('#discount').html('')
        }

    }

    discount(total) {
        let discount = total * 90 / 100
        $('#discount').html(` / 할인금액 : ${discount.toLocaleString()}원`)
    }

    buy() {
        new Purchase(this).open()
        this.basket = []
        this.drawBasket()
    }

    search() {
        let val = $('#search-val').val()
        if(val == "") {
            alert("검색값을 입력해주세요.")
            return
        }
        this.getData = this.getData.filter(x=>x.soapName == val)
        console.log(this.getData);
        $('#search-val').val('')
        this.drawList()
    }

    autoSearch() {
        let val = $('#search-val').val()
        $('#auto-list').html('')

        if(val != "") {
            $('#auto-list').fadeIn()
        } else {
            $('#auto-list').fadeOut()
        }

        
        let searchData = this.getData.filter(x=> x.soapName.includes(val) == true)

        $('#auto-list').append(`
            <div class="auto-list-detail" data-idx=0 data-name="${val}">현재 검색어 : ${val}</div>
        `)

        searchData.forEach((x,i)=> {
            $('#auto-list').append(`
                <div class="auto-list-detail" data-idx=${i+1} data-name="${x.soapName}">${x.soapName}</div>
            `)
        })
        
    }

    selectVal(e) {
        if(!this.auto) {return}

        let code = e.keyCode
        if(code == 38) {
            if(this.keyLoc <= 0) {return}
            this.keyLoc--
            this.changeCol(this.keyLoc)
        } else if(code == 40) {
            if(this.keyLoc >= this.getData.length) {return}
            this.keyLoc++
            this.changeCol(this.keyLoc)
        }


    }

    changeCol(loc) {
        $(`.auto-list-detail`).css('background-color', '#333333')
        $(`.auto-list-detail`).css('color', 'white')
        $(`.auto-list-detail[data-idx=${loc}]`).css('background-color', 'white')
        $(`.auto-list-detail[data-idx=${loc}]`).css('color', 'black')
        
        let val = $(`.auto-list-detail[data-idx=${loc}]`).html().replace("현재 검색어 : ", '')
        $('#search-val').val(val)

    }

}

new App()