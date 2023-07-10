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
        const msg = await $.ajax({
            url:"/api/id_check.json",
            type:"GET"
        })

        // 검사를 완료하고 다시 아이디 입력시 인증이 풀려야하는지 안나와있음(일단 안만듦)
        if(msg.result == 'able') {
            this.checkId = true
            $('#id-check-btn').html('중복검사완료')
        }
    }

    joinProcess() {
        if(this.checkVal && this.checkId) {
            $('.modal').fadeOut()
            alert('회원가입 되었습니다.')
        }
    }

}

new Join()