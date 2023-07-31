export default class SideBar {
    constructor() {
        this.btn = $('#btn-zone > button')


        this.sideList = []
        this.addEvent()

    }

    addEvent() {
        this.btn.click((e)=> this.slideBarAdd(e.target.dataset.json))
        $('#side-bar tbody').click(this.removeList.bind(this))
    }

    slideBarAdd(jsonData){
        let json = JSON.parse(jsonData)

        if(!this.sideList.find(x=>x.name==json.name)) {
            this.sideList.push(json)
            this.slideBarDraw()

        }
    }

    slideBarDraw() {
        $('#side-bar tbody').html('')
        this.sideList.forEach(x=> {
            $('#side-bar tbody').append(`
                <tr>
                    <td class="side-name" data-name="${x.name}">${x.name}</td>
                    <td>${x.visitant}</td>
                    <td>${x.star}</td>
                    <td><button class="btn btn-danger"data-name="${x.name}">삭제</button></td>
                </tr>
            `)
        })
    }

    removeList(e) {
        if(e.target.className != 'btn btn-danger') {return}
        let index = this.sideList.indexOf(this.sideList.find(x=>x.name==e.target.dataset.name))

        this.sideList.splice(index,1)
        this.slideBarDraw()
    }

    remove(json) {
        let index = this.sideList.indexOf(json)

        this.sideList.splice(index,1)
        this.slideBarDraw()
    }

    val() {
        return this.sideList
    }


}