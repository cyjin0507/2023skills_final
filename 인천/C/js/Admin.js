class Admin {
    constructor() {
        this.init()
    }

    async init() {
        this.list = await $.getJSON('/admin/goods/get')
        
        this.drawList()

        this.addEvent()
    }

    drawList() {
        $('tbody').html('')

        this.list.forEach(x=> {
            $('tbody').append(`
            <tr>
                <td><img src="/imgs/${x.img}" alt=""></td>
                <td>${x.name}</td>
                <td>${x.price}</td>
                <td>${x.stock}</td>
                <td><a href="/admin/goods/delete/process/${x.idx}" class="btn btn-danger">삭제</a></td>
            </tr>
            `)
        })
    }

    addEvent() {
        $('#register-btn').click(()=> {$('.modal').fadeIn()})
        $('.cancel').click(()=> {$('.modal').fadeOut()})
    }

}

new Admin()