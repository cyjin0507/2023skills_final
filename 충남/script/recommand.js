let check = true

class Recommand {
    constructor(receiveData = []) {
        if(check) {this.init()}
        check = false
        
        this.receiveData = receiveData
    }
    
    async init() {
        this.data = await $.getJSON('/api/recommend_tourlist.json')
        this.drawList()
        this.addEvent()
        console.log(this.data.data);
    }

    drawList() {
        $('#recommand-list').html('')
        this.data.data.forEach(x=> {
            $('#recommand-list').append(`
                <div class="card-news" data-idx="${x.idx}">
                    <div class="card-image" data-idx="${x.idx}" style="background-image: url('./resources/image/추천여행/${x.photoset[0].name}.jpg');"></div>
                    <div class="user-id">${x.userid}</div>
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
        const imgList = this.data.data[e.target.dataset.idx-1].photoset

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
        this.data = await $.getJSON('/api/recommend_tourlist.json')

        let lastIdx = this.data.data[this.data.data.length - 1].idx
        this.data.data.push({
            "idx" : parseInt(lastIdx) + 1,
            "userid" : 'Guest',
            "photoset" : this.receiveData
        })

        this.addList(parseInt(lastIdx) + 1)
    }
    
    addList(idx) {
        $('#recommand-list').append(`
            <div class="card-news" data-idx="${idx}">
                <div class="card-image" data-idx="${idx}" style="background-image: url('./resources/image/추천여행/${this.receiveData[0].name}.jpg');"></div>
                <div class="user-id">Guest</div>
                <button class="btn btn-primary play-btn" data-idx="${idx}">재생</button>
            </div>
        `)

        $('.play-btn').click((e)=> {
            this.top5Play(e)
        })
    }


}

new Recommand()