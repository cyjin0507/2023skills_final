class Rank {
    constructor(popular = []) {
        this.popular = popular
        this.drawList()
        this.drawGraph()
    }

    drawList() {
        $('#gallery').html('')

        this.popular.forEach((x,i)=> {
            if(i>=5) {return}
            $('#gallery').append(`
                <img data-name="${x.name}" src="./img/0${parseInt(x.idx)+1}.jpg">
            `)
        })

        $('#gallery > img').click(this.itemDetail.bind(this))
        $('.close').click(()=> {$('#detail-modal').fadeOut()})
    }

    itemDetail(e) {
        $('#detail-modal').fadeIn()

        let item = this.popular.filter(x=>x.name == e.target.dataset.name)
        $('.info1').html(item[0].cnt)
        $('.info2').html(Math.round(item[0].score / item[0].cnt,2))
    }

    drawGraph() {
        let score = []
        let name = []
        this.popular.forEach(x=> {
            score.push(x.score)
            name.push(x.name)
        })

        new Graph(score, name)
    }

}