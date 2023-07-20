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

            let dis = this.haversine(x.y, x.x, now.y, now.x)

            distance.push({
                "name" : x.name,
                "type" : x.type,
                "admission" : x.admission,
                "keyword" : x.keyword,
                "dis" : Math.round(dis),
                "time" : Math.round((dis / 40) * 60)
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

    // 하버시안 공식 사용
    haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // 지구 반지름 (단위: km)
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // 두 지점 간의 거리 (단위: km)
        return distance;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    mapControl() {
        let cnt = 0

        $('.mark').css('display', 'none')
        $('.info').css('display', 'none')
        $('.intro').css('display', 'none')

        console.log(this.distance);

        this.distance.forEach(x=> {
            if(cnt < 3) {
                if(x.type == this.type) {
                    this.drawMapInfo(x)
                    cnt++
                }
            }
        })

        console.log(cnt);

        this.distance.forEach(x=> {
            if(cnt < 3) {
                if(x.type != this.type) {
                    this.drawMapInfo(x)
                    cnt++
                }
            }   
        })

    }

    drawMapInfo(x) {
        $(`g.mark[data-name="${x.name}"]`).fadeIn()
        $(`g.info[data-name="${x.name}"]`).fadeIn()
        $(`g.info[data-name="${x.name}"] .distance`).html(`거리 : ${x.dis}km`)
        $(`g.info[data-name="${x.name}"] .time`).html(`예상소요시간 : ${x.time}분`)
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