class App {
    constructor() {
        this.init()
    }

    async init() {
        this.list = await $.getJSON('/json/list.json')
        this.list = this.list.place

        this.setTourList()
        this.addEvent()
    }

    addEvent() {
        $('#tour-list').on('change', this.findTourList.bind(this))
        $('#tour-type').on('change', this.findTourList.bind(this))

        $('g.mark').hover(e=> {
            $(`.intro[data-name="${e.target.dataset.name}"]`).stop().fadeIn()
        }, (e)=> {
            $(`.intro[data-name="${e.target.dataset.name}"]`).stop().fadeOut()
        })
    }

    findTourList() {
        this.tour = $('#tour-list').val()
        this.type = $('#tour-type').val()

        let now = this.list.filter(x=> x.name == this.tour)[0]

        // 최단거리 배출하는 함수
        this.process(now)
    }

    process(now) {
        let distance = []
        this.list.forEach((x,i)=> {
            if(x.name == now.name) {return}

            let bX = x.x
            let sX = now.x

            if(bX < sX) {
                let tX = sX
                sX = bX
                bX = tX
            }

            let bY = x.y
            let sY = now.y

            if(bY < sY) {
                let tY = sY
                sY = bY
                bY = tY
            }

            let rX = bX - sX
            let rY = bY - sY

            // 임의로 10를 곱함
            rX *= 100
            rY *= 100

            let dis = Math.sqrt(Math.pow(rX,2) + Math.pow(rY,2))

            distance.push({
                "name" : x.name,
                "type" : x.type,
                "admission" : x.admission,
                "keyword" : x.keyword,
                "dis" : Math.round(dis * 100) / 100,
                "time" : (dis / 40) * 60
            })
        })

        // 최단거리로 정렬
        let arr = []
        distance.forEach((x,i)=> {
            if(i==0) {arr.push(x)} else {
                for(let j=0; j<arr.length; j++) {
                    if(arr[j].dis > x.dis) {
                        arr.splice(j,0,x)
                        break
                    } else if(j==arr.length-1) {
                        arr.push(x)
                        break
                    }
                }
            }

            
        })

        this.distance = arr

        this.mapControl()
    }

    mapControl() {
        let cnt = 0

        $('.mark').css('display', 'none')
        $('.info').css('display', 'none')
        $('.intro').css('display', 'none')

        this.distance.forEach(x=> {
            if(cnt < 3) {
                if(x.type == this.type) {
                    this.drawMapInfo(x)
                    cnt++
                }
            }
        })

        console.log(this.distance);

        if(cnt < 3) {
            this.distance.forEach(x=> {
                if(cnt < 3) {
                    if(x.type != this.type) {
                        this.drawMapInfo(x)
                        cnt++
                    }
                }   
            })
        }

    }

    drawMapInfo(x) {
        $(`g.mark[data-name="${x.name}"]`).fadeIn()
        $(`g.info[data-name="${x.name}"]`).fadeIn()
        $(`g.info[data-name="${x.name}"] .distance`).html(`거리 : ${x.dis}km`)
        $(`g.info[data-name="${x.name}"] .time`).html(`예상소요시간 : ${x.time}`)
        $(`g.info[data-name="${x.name}"] .admission`).html(`입장요금 : ${x.admission}원`)
        $(`g.info[data-name="${x.name}"] .keyword`).html(`키워드 : ${JSON.stringify(x.keyword)}`)
    }

    setTourList() {
        $('#tour-list').html('')
        this.list.forEach(x=> {
            $('#tour-list').append(`
                <option value="${x.name}">${x.name}</option>
            `)
        })
    }

}

new App()