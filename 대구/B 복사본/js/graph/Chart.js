import Sidebar from "../Sidebar.js"

let check = true

export default class Chart {
    constructor() {
        if(check) {
            this.addEvent()
        }
        check = false
        this.init()
    }

    async init() {
        $('#modal').fadeIn()
        this.category = ["star", "review", "visitant", "returning_visitor", "parking", "managed"]
        this.graph = new Graph(Sidebar.sideList, this.category)

        this.json = await $.ajax({
            url : '/json/attraction.json',
            method : 'GET',
            cache : false
        })
        
        this.categorySet()
        this.listSet()
    }

    categorySet() {
        this.category.forEach(x=> {
            $(`#category > div[data-category="${x}" ]`).addClass('active')
        })
    }

    listSet() {
        $('#list > div').removeClass('active')
        Sidebar.sideList.forEach(x=> {
            $(`#list > div[data-list="${x}" ]`).addClass('active')
        })
        $('#list > div:not(.active)').css({
            'background-color' : 'white',
            'color' : 'black'
        })
    }

    addEvent() {
        $('#category > div').click(this.categoryChange.bind(this))
        $('#list > div').click(this.listChange.bind(this))

        $('#reload').click(this.reload.bind(this))

        $('.close').click(()=> {
            $('#modal').fadeOut()
        })
    }

    categoryChange(e) {
        let index = this.category.indexOf(e.target.dataset.category)
        if(e.target.className.includes('active')) {
            if(this.category.length <= 3) {
                alert("more than 3")
                return
            }
            this.category.splice(index,1)
            $(e.target).removeClass('acvtive')
        } else {
            this.category.splice(index,0,e.target.dataet.category)
            $(e.target).adClass('acvtive')
        }
        this.graph = new Graph(Sidebar.sideList, this.category)
    }

    listChange(e) {
        let findData = this.json['data'].find(x=>x.name==e.target.dataset.list)
        if(e.target.className.includes('active')) {
            Sidebar.remove(JSON.stringify(findData))
            $(e.target).removeClass('active')
            $(e.target).css({
                'background-color' : 'white',
                'color' : 'black'
            })
        } else {
            if(Sidebar.sidebarAdd(JSON.stringify(findData))) {
                $(e.target).addClass('active')
            }
        }
    
        this.graph = new Graph(Sidebar.sideList, this.category)
    }

}