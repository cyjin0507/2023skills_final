let sideList = []
let check = true

export default class Sidebar {
    constructor() {
        this.btn = $('#btn-zone > button')
        if(check) {
            this.addEvent()
        }
        check = false
    }

    addEvent() {
        this.btn.click(e=> this.sidebarAdd(e.target.dataset.json))
        $('#side-list tbody').click(this.removeList.bind(this))
    }

    sidebarAdd(json) {
        $('#btn-zone').fadeOut()

        json = JSON.parse(json)
        if(!sideList.find(x=>x.name==e.target.dataset.name)) {
            sideList.push(json)
            this.sideListDraw()
        } else {
            alert("이미 있습니다")
        }
    }

    sideListDraw() {
        $('#side-list tbody').html('')

        sideList.forEach(x=> {
            $('#side-list tbody').append(`
            
            `)
        })
    }

    removeList(e) {
        if(e.target.className != 'btn btn-danger') return

        
    }

    remove(json) {
        json = JSON.parse(json)
        
    }
    
}