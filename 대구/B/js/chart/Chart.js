
import Sidebar from "../Sidebar.js"
import Graph from "./graph.js"
let check = false

export default class Chart {
    constructor() {
        if(!check) {
            this.addEvent()
        }
        check = true

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
            $(`#category > div[data-category="${x}"]`).addClass('active')
        })
    }
    
    listSet() {
        $('#list > div').removeClass('active')

        Sidebar.sideList.forEach(x=> {
            $(`#list > div[data-list="${x.name}"]`).addClass('active')
        })
        $('#list > div:not(.active)').css({
            'background-color' : 'white',
            'color' : 'black'
        })
    }

    addEvent() {
        $('#list > div').click(this.listChange.bind(this))
        $('#category > div').click(this.categoryChange.bind(this))

        $('#reload').click(this.reload.bind(this))
        $('.close').click(()=> {
            $('#modal').fadeOut()
        })
    }

    categoryChange(e) {
        let index = this.category.indexOf(e.target.dataset.category)

        if(e.target.className.includes('active')) {
            if(this.category.length <= 3) {
                alert("카테고리는 3개 이상이여야함")
                return
            }

            $(e.target).removeClass('active')
            this.category.splice(index,1)
        } else {
            $(e.target).addClass('active')
            this.category.splice(index,0,e.target.dataset.category)
        }

        this.graph = new Graph(Sidebar.sideList, this.category)
    }

    listChange(e) {
        let findData = this.json['data'].find(x=>x.name==e.target.dataset.list)
        let index = Sidebar.sideList.findIndex(x=>x.name==e.target.dataset.list)

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
                // $(e.target).attr('data-json',JSON.stringify(findData))
            }
            
        }

        this.graph = new Graph(Sidebar.sideList, this.category)
    }

    async reload() {
        let arr = []

        this.json = await $.ajax({
            url : '/json/attraction.json',
            method : 'GET',
            cache : false
        })

        this.json['data'].forEach(x=> {
            Sidebar.sideList.forEach(j=> {
                if(x.name == j.name) {
                    arr.push(x)
                }
            })
        })

        Sidebar.sideList = arr
        this.graph = new Graph(Sidebar.sideList, this.category)
    }

}