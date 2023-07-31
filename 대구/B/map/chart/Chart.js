import Popup from "./Popup.js"
import Dom from "./Dom.js";
import Graph from "./Graph.js";
import SideBar from "../SideBar.js";

export default class Chart extends Popup {
    constructor(data) {
        super('chart.html')
    }

    async init(data) {
        this.dom = new Dom(this.document)
        this.data = data
        this.category = ["star", "review", "visitant", "returning_visitor", "parking", "managed"]
        this.graph = new Graph(this.document, this.data, this.category)

        this.json = await $.getJSON('/json/attraction.json')
        this.sidebar = new SideBar()

        this.categorySet()
        this.listSet()

    }

    categorySet() {
        this.category.forEach(x=> {
            this.dom.dom(`#category > div[data-category="${x}"]`).addClass('active')
        })
    }

    listSet() {
        this.data.forEach(x=> {
            this.dom.dom(`#list > div[data-list="${x.name}"]`).addClass('active')
        })
    }

    addEvent() {
        this.dom.domAll("#category > div").click(this.changeCategory.bind(this))
        this.dom.domAll("#list > div").click(this.changeList.bind(this))
    }

    changeCategory(e) {
        if(this.category.length<=3) {
            // this.document.alert("카테고리는 3개이상이여야함")
        }

        let index = this.category.indexOf(e.target.dataset.category)
        
        if(e.target.className.includes('active')) {
            this.category.splice(index, 1)
            $(e.target).removeClass('active')
        } else {
            this.category.splice(index, 0, e.target.dataset.category)
            $(e.target).addClass('active')
        }

        this.graph = new Graph(this.document, this.data, this.category)
    }

    changeList(e) {
        let findData = this.json['data'].find(x=> x.name==e.target.dataset.list)
        let index = this.data.indexOf(this.data.find(x=> x.name==e.target.dataset.list))
        if(e.target.className.includes('active')) {
            this.data.splice(index, 1)
            $(e.target).removeClass('active')
            this.sidebar.remove(JSON.stringify(findData))
        } else {
            $(e.target).attr('data-json',JSON.stringify(findData))
            this.data.splice(index, 0, this.json['data'].find(x=> x.name==e.target.dataset.list))
            $(e.target).addClass('active')
            this.sidebar.slideBarAdd(JSON.stringify(findData))
        }
        this.graph = new Graph(this.document, this.data, this.category)

    }
    
    mapClick(json) {
        this.data.push(json)
        this.graph = new Graph(this.document, this.data, this.category)
    }




}