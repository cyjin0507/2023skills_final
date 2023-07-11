class Join {
    constructor() {

        // 중복검사 했는지 확인
        this.checkId = false

        // 입력 요구조건 다 충족했는지 확인
        this.checkVal = true

        this.addEvent()
    }

    addEvent() {
        $('#join-open-btn').click(()=> {$('#join-modal').fadeIn()})
        $('.close').click(()=> {$('.modal').fadeOut()})
        
        // 중복검사 눌렀을 때
        $('#id-check-btn').click(this.checkIdFunc.bind(this))

        $('#join-btn').click(this.joinProcess.bind(this))
    }

    async checkIdFunc() {

        // ajax로 가져옴
        const msg = JSON.parse(await $.ajax({
            url:"/api/id/check",
            type:"POST",
            data: JSON.stringify({
                "id":$('#join-id').val()
            })
        }))

        // 검사를 완료하고 다시 아이디 입력시 인증이 풀려야하는지 안나와있음(일단 안만듦)
        if(msg.result == 'able') {
            this.checkId = true
            alert(msg.message)
            $('#id-check-btn').html('중복검사완료')
        } else {
            alert(msg.message)
        }
    }

    async joinProcess() {
        if(this.checkVal && this.checkId) {
            const msg = JSON.parse(await $.ajax({
                url:"/api/join",
                type:"POST",
                data: JSON.stringify({
                    "id":$('#join-id').val(),
                    "password":$('#join-pw').val(),
                    "name":$('#join-name').val(),
                    "tel":$('#join-tel').val(),
                    "addr":$('#join-addr').val(),
                })
            }))

            alert(msg.message)
            if(msg.result == 'success') {
                $('.modal').fadeOut()
            }
        }
    }

}

new Join()