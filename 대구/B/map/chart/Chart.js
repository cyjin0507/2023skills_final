import Graph from "./Graph.js";
import SideBar from "../SideBar.js";

export default class Chart{
    constructor(data) {
        this.data = data
        this.init()
    }

    async init() {
        $('#modal').fadeIn()

        this.category = ["star", "review", "visitant", "returning_visitor", "parking", "managed"]
        this.graph = new Graph(this.data, this.category)

        this.json = await $.ajax({
            url : '/json/attraction.json',
            type : 'get',
            cache : false
        })
        this.sidebar = new SideBar()

        this.categorySet()
        this.listSet()
        this.addEvent()

    }

    categorySet() {
        this.category.forEach(x=> {
            $(`#category > div[data-category="${x}"]`).addClass('active')
        })
    }

    listSet() {
        this.data.forEach(x=> {
            $(`#list > div[data-list="${x.name}"]`).addClass('active')
        })
    }

    addEvent() {
        $("#category > div").click(this.changeCategory.bind(this))
        $("#list > div").click(this.changeList.bind(this))

        $('#reload').click(this.reload.bind(this))
        $('.close').click(()=> {
            $('#modal').fadeOut()
        })
    }

    changeCategory(e) {
        let index = this.category.indexOf(e.target.dataset.category)
        
        if(e.target.className.includes('active')) {
            if(this.category.length<=3) {
                alert("카테고리는 3개이상이여야함")
                return
            }

            this.category.splice(index, 1)
            $(e.target).removeClass('active')
        } else {
            this.category.splice(index, 0, e.target.dataset.category)
            $(e.target).addClass('active')
        }

        this.graph = new Graph(this.data, this.category)
    }

    changeList(e) {
        let findData = this.json['data'].find(x=> x.name==e.target.dataset.list)
        let index = this.data.indexOf(this.data.find(x=> x.name==e.target.dataset.list))
        if(e.target.className.includes('active')) {
            this.data.splice(index, 1)
            $(e.target).css({
                'background-color' : 'white',
                'color' : 'black'
            })
            $(e.target).removeClass('active')

            this.sidebar.remove(JSON.stringify(findData))
        } else {
            $(e.target).attr('data-json',JSON.stringify(findData))
            this.data.splice(index, 0, this.json['data'].find(x=> x.name==e.target.dataset.list))
            this.sidebar.slideBarAdd(JSON.stringify(findData))

            $(e.target).addClass('active')
            $(e.target).css({
                'color' : 'white'
            })
        }
        this.graph = new Graph(this.data, this.category)
    }
    
    mapClick(json) {
        this.data.push(json)
        this.graph = new Graph(this.data, this.category)
    }

    async reload() {
        this.json = await $.ajax({
            url : '/json/attraction.json',
            type : 'get',
            cache : false
        })
        
        let arr = []
        this.json['data'].forEach(x=> {
            this.data.forEach(j=> {
                if(j.name == x.name) {
                    arr.push(x)
                }
            })
        })
        this.data = arr
        
        this.graph = new Graph(this.data, this.category)
    }

}   