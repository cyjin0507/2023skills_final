class Detail {
    constructor() {
        this.init()
    }

    init() {
        this.input = document.querySelector('#inputPrice')
        this.priceValue = document.querySelector('#priceValue')
        this.price = document.querySelector('.price')


        this.input.addEventListener('change',()=>{
            this.price.innerHTML = this.input.value * this.priceValue.value
        })
    }
}
class Sale {
    constructor() {
        this.init()
    }

    init() {
        this.start = document.form.start
        this.end = document.form.end
        this.btn = document.querySelector('.submit-btn')


        this.btn.addEventListener('click',()=>{
            if(this.start.value == "" || this.end.value == "") {
                alert("값을 입력해주세요");
                return;
            }
            if(this.start.value > this.end.value) {
                alert("시작일이 종료일 보다 큽니다.")
                return;
            }
            document.form.submit()
        })
    }
}


window.addEventListener('load', ()=>{
    if(window.location.href.includes("detail")) {
        new Detail()
    }
    if(window.location.href.includes("Sale")) {
        new Sale()
    }
})


