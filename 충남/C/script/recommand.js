let check = true

class Recommand {
    constructor(receiveData = []) {
        // if(check) {this.init()}
        // check = false

        this.init()
        this.receiveData = receiveData

        
    }
    
    async init() {
        this.data = await $.getJSON('/api/recommand/get')
        this.dataSet()
        // console.log(this.data);

        this.drawList()
        this.addEvent()
        
        this.graphControl()
    }

    dataSet() {
        this.data.data.forEach(x=> {
            x.recommand = JSON.parse(x.recommand)
        })
    }

    drawList() {
        $('#recommand-list').html('')
        this.data.data.forEach(x=> {
            $('#recommand-list').append(`
                <div class="card-news" data-idx="${x.idx}">
                    <div class="card-image" data-idx="${x.idx}" style="background-image: url('./resources/image/추천여행/${x.recommand[0].name}.jpg');"></div>
                    <div class="user-id">${x.uid}</div>
                    <button class="btn btn-primary play-btn" data-idx="${x.idx}">재생</button>
                </div>
            `)
        })
    }

    addEvent() {
        $('.play-btn').click((e)=> {
            this.top5Play(e)
        })
    }

    top5Play(e) {
        const imgList = this.data.data.filter(x=>x.idx==e.target.dataset.idx)[0].recommand
        let i = 0
        const play = setInterval(()=> {
            if(i >= 5) {
                i=0
                clearInterval(play)
                $(`.card-image[data-idx=${e.target.dataset.idx}]`).css('background-image', `url('./resources/image/추천여행/${imgList[0].name}.jpg')`)
            }
            
            $(`.card-image[data-idx=${e.target.dataset.idx}]`).css('background-image', `url('./resources/image/추천여행/${imgList[i].name}.jpg')`)
            i++
            
        },1000)


    }

    async addData() {
        // 머리가 안돌아가서 일단 localStorage로 박음
        // 이유 : 이 함수 안에서 json을 계속 불러와서 전에 push한 배열이 초기화됨
        // & 생성자에서 호출하려고 해도 이 함수에선 안불러와짐 (미래에 내가 하겠지..)

        const json = await $.getJSON('/api/recommend_tourlist.json')
        if(localStorage.getItem('list') == undefined) {
            localStorage.setItem('list', JSON.stringify(json))
        }

        this.data = JSON.parse(localStorage.getItem('list'))

        this.lastIdx = parseInt($('.card-news').length) + 1
        this.data.data.push({
            "idx" : this.lastIdx,
            "userid" : 'Guest',
            "photoset" : this.receiveData
        })

        localStorage.setItem('list', JSON.stringify(this.data))

        this.addList()
    }
    
    addList() {
        $('#recommand-list').append(`
            <div class="card-news" data-idx="${this.lastIdx}">
                <div class="card-image" data-idx="${this.lastIdx}" style="background-image: url('./resources/image/추천여행/${this.receiveData[0].name}.jpg');"></div>
                <div class="user-id">Guest</div>
                <button class="btn btn-primary play-btn" data-idx="${this.lastIdx}">재생</button>
            </div>
        `)

        $('.play-btn').click((e)=> {
            this.top5Play(e)
        })
    }

    async graphControl() {
        const countData = await $.getJSON('/api/stats/count/get')
        let count = []
        let countName = []
        countData.forEach(x=> {
            count.push(x.count)
            countName.push(x.name)
        })
        
        new Bar(count, countName)

        const scoreData = await $.getJSON('/api/stats/score/get')
        let score = []
        let scoreName = []
        scoreData.forEach(x=> {
            score.push(parseInt(x.score))
            scoreName.push(x.name)
        })
        
        new Pie(score, scoreName)
    }

}

new Recommand()