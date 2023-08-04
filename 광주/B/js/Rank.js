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
        $('#comment-list').html('')
        let item = this.popular.find(x=>x.name == e.target.dataset.name)

        item.comment.forEach(x=> {
            $('#comment-list').append(`
                <p>${x}</p>
            `)
        })

        $('.info1').html(item.cnt)
        $('.info2').html(Math.round(item.score / item.cnt,2))
        $('#detail-modal').fadeIn()
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