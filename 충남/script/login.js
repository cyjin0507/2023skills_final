class Login {
    constructor() {
        // 입력 요구조건 다 충족했는지 확인
        this.checkVal = true

        this.addEvent()
    }

    addEvent() {
        $('#login-open-btn').click(()=> {$('#login-modal').fadeIn()})

        $('#login-btn').click(this.loginProcess.bind(this))
    }

    async loginProcess() {
        // 나중에 validation 검사 함수
        // ...

        const msg = await $.ajax({
            url:"/api/login_check.json",
            type:"GET"
        })

        if(msg.result == 'success') {
            alert(msg.message)
            $('#login-modal').fadeOut()
        } else {
            alert(msg.message)
        }

    }

}

new Login()