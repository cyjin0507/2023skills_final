import Sidebar from "../Sidebar"

let check = true

export default class Graph {
    constructor() {
        if(check) {
            this.addEvent()
        }
        check = false
        this.init()
    }

    async init() {
        $('#modal').fadeIn()

        this.category = ['star','review','visitant','returning_visitor','parking','managed']
        this.graph = new Chart(Sidebar.sideList, this.category)

        this.json = await $.ajax({
            url : '/json/attraction.json',
            method : 'GET',
            cache : false
        })

        this.categorySet()
        this.listSet()
    }

    addEvent() {
        $('#list > div').click(this.changeList.bind(this))
        $('#category > div').click(this.changeCategory.bind(this))

        $('#reload').click(this.reload.bind(this))

        $('.close').click(()=> {
            $('.modal').fadeOut()
        })
    }

    categorySet() {
        this.category.forEach(x=> {
            $(`#category > div[data-category="${x}"]`).addClass('active')
        })
    }

    listSet() {
        $('#list > div').removeClass('active')

        this.list.forEach(x=> {
            $(`#list > div[data-list="${x}"]`).addClass('active')
        })

        $('#list > div:not(.active)').css({
            'background-color' : 'white',
            'color' : 'black'
        })
    }

    changeCategory(e) {
        let index = this.category.findIndex(x=>x==e.target.dataset.category)

        if(e.target.className.includes('active')) {
            e.target.removeClass('active')
            this.category.splice(index,1)
        } else {
            e.target.addClass('active')
            this.category.splice(index,0,e.target.dataset.category)
        }

        this.graph = new Chart(Sidebar.sideList, this.category)
    }

    changeList(e) {
        let findData = Sidebar.sideList.find(x=>x.name==e.target.dataset.list)

        if(e.target.className.includes('active')) {
            $(e.target).removeClass('active')
            $(e.target).css({
                'background-color' : 'white',
                'color' : 'black'
            })
            Sidebar.remove(JSON.stringify(findData))
        } else {
            if(Sidebar.sidebarAdd(JSON.stringify(findData))) {
                $(e.target).addClass('active')
            }
        }

        this.graph = new Chart(Sidebar.sideList, this.category)
    }

    async reload() {
        let arr = []
 
        this.json = await $.ajax({
            url : '/json/attraction.json',
            method : 'GET',
            cache : false
        })

        this.json.forEach(x=> {
            Sidebar.sideList.forEach(j=> {
                if(x.name == j.name) {
                    arr.push(x)
                }
            })
        })

        Sidebar.sideList = arr
        this.graph = new Chart(Sidebar.sideList, this.category)
    }
}