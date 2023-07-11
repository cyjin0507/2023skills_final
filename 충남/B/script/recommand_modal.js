class Modal {
    constructor() {
        this.recommandList = ['각원사','광덕사','산사현대시100년관','아라리오조각광장','자연누리성','중앙시장','천안박물관','택학산자연휴양림','홍대용과학관']
        this.top5List = []
        this.dragItem = ""

        this.init()

    }

    init() {
        this.drawRecommandList()
        this.addEvent()
    }

    drawRecommandList() {
        $('#recommand-image-area').html('')

        this.recommandList.forEach(x=> {
            $('#recommand-image-area').append(`
                <div class="recommand-image" draggable="true" data-name="${x}">
                    <img src="./resources/image/추천여행/${x}.jpg" alt="" data-name="${x}">
                    <div data-name="${x}">${x}</div>
                </div>
            `)
        })

        this.dropItemCheck()
    }

    dropItemCheck() {
        // TOP5에서 드래그 된 요소인지 확인
        this.deleteItemCheck = false

        $('.recommand-image').on('dragstart', (e)=> {
            this.deleteItemCheck = false
            this.dragItem = e.target.dataset.name
        })

        $('.recommand-img-rank').on('dragstart', (e)=> {
            this.deleteItemCheck = true
            this.dragItem = e.target.dataset.name
        })
    }

    addEvent() {
        // 드롭박스에 드롭되는지 확인
        let dropZoneCheck = false

        this.dropItemCheck()

        $('#recommand-dragzone').on("dragover", (e)=> {
            e.stopPropagation();
            e.preventDefault();
          }).on('drop', (e)=> {
            e.preventDefault();
            if(!this.deleteItemCheck) {
                this.decideRecommand(e)
                dropZoneCheck = true
            } else {
                this.changeRankIn(e)
            }
            
            
        })


        $('body').on("dragover", (e)=> {
            e.stopPropagation();
            e.preventDefault();
          }).on("drop", (e)=> {
            if(!this.deleteItemCheck) {return}
            dropZoneCheck = !dropZoneCheck
            if(!dropZoneCheck) {return}
            this.top5List.splice(this.top5List.indexOf(this.dragItem), 1)
            this.recommandList.push(this.dragItem)
            this.drawTop5List()
            this.drawRecommandList()
        })


        $('#modal-open').click(()=> {$('#recommand-modal').fadeIn()})
        $('.close').click(this.close.bind(this))
        $('#recommand-btn').click(this.recommandFinal.bind(this))
    }

    // 드래그 했을때
    decideRecommand(e) {
        if(e.target.className == 'drop-rank') {
            this.top5List.splice(e.target.dataset.idx,0,this.dragItem)
        } else {
            this.top5List.push(this.dragItem)
        }

        if(this.top5List.length > 5) {
            alert('최대 5곳까지 추천할 수 있습니다.')
        }

        this.recommandList.splice(this.recommandList.indexOf(this.dragItem), 1)
        this.drawTop5List()
        this.drawRecommandList()

    }

    // 드래그 한것들 중에서 순서변환 (미완)
    changeRankIn(e) {
        if(e.target.className == 'drop-rank') {
            // console.log(this.top5List.indexOf(this.dragItem));
            this.top5List.splice(this.top5List.indexOf(this.dragItem),1)
            this.top5List.splice(e.target.dataset.idx,0,this.dragItem)
        }
    }

    recommandFinal() {
        if(this.top5List.length < 5) {
            alert('5곳의 여행지를 추천해주세요')
            return
        }

        const rData = [
            {
                "rank" : "1",
                "name" : `${this.top5List[0]}`
            },
            {
                "rank" : "2",
                "name" : `${this.top5List[1]}`
            },
            {
                "rank" : "3",
                "name" : `${this.top5List[2]}`
            },
            {
                "rank" : "4",
                "name" : `${this.top5List[3]}`
            },
            {
                "rank" : "5",
                "name" : `${this.top5List[4]}`
            },
        ]

        new Recommand(rData).addData()
        
        this.close()

    }

    drawTop5List() {
        $('#recommand-dragzone').html('')
        this.top5List.forEach((x,i)=> {
            $('#recommand-dragzone').append(`
                <div class="drop-rank" data-idx="${i}"></div>
                <div class="recommand-img-rank" draggable="true" data-name="${x}">
                    <img src="./resources/image/추천여행/${x}.jpg" data-name="${x}" alt="">
                    <div data-name="${x}">${i+1}</div>
                </div>
            `)
        })

        this.dropItemCheck()

    }

    close() {
        $('.modal').fadeOut()
        this.top5List = []
        this.recommandList = ['각원사','광덕사','산사현대시100년관','아라리오조각광장','자연누리성','중앙시장','천안박물관','택학산자연휴양림','홍대용과학관']
        $('#recommand-dragzone').html('')
        this.drawRecommandList()
    }


}

new Modal()