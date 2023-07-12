class Purchase extends Popup {
    constructor(app) {
        super('./purchase.html')
        this.app = app
        this.basket = this.app.basket
    }

    init() {
        const canvas = this.document.querySelector('#canvas')
        this.ctx = canvas.getContext('2d')
        this.ctx.font = "italic bold 20px Arial, sans-serif";

        this.frame()
        this.itemDraw()
    }
    
    frame() {
        this.ctx.fillText('영수증', 170,40)

        this.ctx.fillText('품명', 30,80)
        this.ctx.fillText('-------------------', 30,100)

        this.ctx.fillText('수량', 190,80)
        this.ctx.fillText('---------', 190,100)

        this.ctx.fillText('금액', 300,80)
        this.ctx.fillText('--------------', 300,100)


    }

    itemDraw() {
        let y = 120
        let total = 0
        this.basket.forEach((x,i)=> {
            let price = parseInt(x.price.replace('원', ''))
            this.ctx.fillText(x.name, 30, y + i*40)
            this.ctx.fillText(x.count + "개", 190, y + i*40)
            this.ctx.fillText((price * x.count).toLocaleString() + "원", 300, y + i*40)
            
            total += price * x.count
        })

        let discount = 0
        if(total > 30000) {
            discount = total * 10 / 100
        }

        this.ctx.fillText("----------------------------------------------", 30, 380)
        this.ctx.fillText("총 금액 : " + total.toLocaleString() + "원", 30, 410)
        this.ctx.fillText("할인금액 : " + discount.toLocaleString() + "원 (10%적용)", 30, 450)
        this.ctx.fillText("결재 금액 : " + (total - discount).toLocaleString() + "원", 30, 490)
    }

    addEvent() {}



}