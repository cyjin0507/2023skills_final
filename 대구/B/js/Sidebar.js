
export default class Sidebar {
    static sideList = []

    static sidebarAdd(json) {
        json = JSON.parse(json)
        if(!this.sideList.find(x=>x.name==json.name)) {
            this.sideList.push(json)
            Sidebar.sideListDraw()
            return true
        } else {
            alert("이미 있음")
            return false
        }
    }

    static sideListDraw() {
        $('#side-list tbody').html('')
        this.sideList.forEach(x=> {
            if(x.name != "user") {
                $('#side-list tbody').append(`
                <tr>
                    <td class="place-sliding"  data-name="${x.name}">${x.name}</td>
                    <td><button class="btn btn-danger" data-name="${x.name}">삭제</button></td>
                </tr>
            `)
            }
        })
    }

    static removeList(e) {
        if(e.target.className != 'btn btn-danger') return

        let index = this.sideList.findIndex(x=>x.name==e.target.dataset.name)
        this.sideList.splice(index,1)
        Sidebar.sideListDraw()
    }

    static remove(json) {
        json = JSON.parse(json)
        let index = this.sideList.findIndex(x=>x.name == json.name)
        this.sideList.splice(index,1)
        Sidebar.sideListDraw()
    }


}