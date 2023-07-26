class Place {
    constructor() {
        this.init()
    }

    async init() {
        const {data} = await $.getJSON('/resources/json/place.json')
        this.data = data
        
        this.drawList()
    }

    drawList() {
        $('tbody').html('')
        this.data.forEach(x=> {
            $('tbody').append(`
                <tr>
                    <td><img src="/resources/imgs/place/${x.idx}.jpg" alt=""></td>
                    <td>${x.title}</td>
                    <td>${x.point}</td>
                    <td>${x.review_cnt}</td>
                    <td>${x.distance}</td>
                    <td><button class="btn btn-primary">리뷰 작성</button></td>
                </tr>
            `)
        })
    }

}

new Place()