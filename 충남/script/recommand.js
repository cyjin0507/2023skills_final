class Recommand {
    constructor() {
        this.recommandList = ['각원사','광덕사','산사현대시100년관','아라리오조각광장','자연누리성','중앙시장','천안박물관','택학산자연휴양림','홍대용과학관']
        this.top5List = []
        this.dragItem = ""

        this.init()
    }

    init() {
        this.drawRecommandList()
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
        this.addEvent()
    }

    addEvent() {
        $('.recommand-image').on('dragstart', (e)=> {
            this.dragItem = e.target.dataset.name
        })

        $('#recommand-dragzone').on("dragover", (e)=> {
            e.stopPropagation();
            e.preventDefault();
          }).on('drop', (e)=> {
            e.preventDefault();
            this.recommandList.splice(this.recommandList.indexOf(this.dragItem), 1)
            this.top5List.push(this.dragItem)
            this.drawTop5List()
            this.drawRecommandList()
            console.log(this.recommandList);
        })

    }

    drawTop5List() {
        $('#recommand-dragzone').html('')
        this.top5List.forEach(x=> {
            $('#recommand-dragzone').append(`
                <div class="drop-rank"></div>
                <img src="./resources/image/추천여행/${x}.jpg" alt="">
            `)
        })

        $('.drop-rank').on('dragover', (e)=> {
            e.stopPropagation();
            e.preventDefault();
        }).on('drop', (e)=> {
            console.log("sdf");
        })

    }


}

new Recommand()