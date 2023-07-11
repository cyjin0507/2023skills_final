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

        const msg = JSON.parse(await $.ajax({
            url:"/api/login",
            type:"POST",
            data: JSON.stringify({
                "id":$('#login-id').val(), "password":$('#login-pw').val()
            })
        }))

        if(msg.result == 'success') {
            alert(msg.message)
            $('#login-modal').fadeOut()
            $('#user-control').html(`
                <a href="/logout" class="btn btn-primary mt-5">로그아웃</a>
                <a href="/mypage" class="btn btn-primary mt-5">마이페이지</a>
            `)
        } else {
            alert(msg.message)
        }

    }

}

new Login()