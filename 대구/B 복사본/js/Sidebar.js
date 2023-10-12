export default class Sidebar {
    static sideList = []

    static sidebarAdd(json) {
        json = JSON.parse(json)
        
        if(!this.sideList.find(x=>x.name == json.name)) {
            this.sideList.push(json)
            this.sideListDraw()
            return true
        } else {
            alert("이미 있음")
            return false
        }
    }

    static sideListDraw() {
        $('#side-list').html('')
        this.sideList.forEach(x=> {
            $('#side-list').append(`
                <tr>
                    <td data-name="${x.name}">${x.name}</td>
                    <td data-name="${x.name}" class="btn btn-danger">삭제</td>
                </tr>
            `)
        })
    }

    static removeList(e) {
        if(e.target.className != 'btn btn-danger') return
        let index = this.sideList.findIndex(x=>x.name==e.target.dataset.name)

        this.sideList.splice(index)
        this.sideListDraw()
    }

    static remove(json) {
        json = JSON.parse(json)

        let index = this.sideList.findIndex(x=>x.name==json.name)
        
        this.sideList.splice(index)
        this.sideListDraw()
    }

}