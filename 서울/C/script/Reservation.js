class Reservation {
    constructor() {
        this.addEvent()
    }

    addEvent() {
        // $('#reserv-btn').click(this.reserv.bind(this))
        $('#reserv-btn').click(this.reservClick.bind(this))
    }

    reservClick() {
        let reservDate = $('#reserv-data-val').val()
        let cidx = $('#cidx').val()
        let term = $('#term').val()

        window.location.href = `/reserv/info/${reservDate}/${cidx}/${term}`

    }

    // async reserv() {
    //     let reservDate = $('#reserv-data-val').val()
    //     let cidx = $('#cidx').val()
    //     let term = $('#term').val()

    //     const response = await $.ajax({
    //         "url" : "/reserv/process",
    //         "type" : "POST",
    //         "data" : JSON.stringify({
    //             "reservDate" : reservDate,
    //             "cidx" : cidx,
    //             "term" : term
    //         })
    //     })

    //     console.log(response);
        

    // }

}

new Reservation()