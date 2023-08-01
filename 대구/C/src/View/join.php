<h3 class="mt-5">회원가입</h3>
<form action="/join/process" method="POST">
    <div class="input-group mt-3">
        <span class="input-group-text">아이디</span>
        <input type="text" class="form-control" name="id">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">비밀번호</span>
        <input type="text" class="form-control" name="pw">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">성명</span>
        <input type="text" class="form-control" name="name">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">생년월일</span>
        <input type="text" class="form-control" name="birth">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">전화번호</span>
        <input type="text" class="form-control" name="phone">
    </div>
    <div class="input-group mt-3">
        <span class="input-group-text">회원구분</span>
        <select name="type" class="form-control">
            <option value="0">일반회원</option>
            <option value="1">투어 관리자</option>
        </select>
    </div>
    <button class="btn btn-primary mt-3" type="button">회원가입</button>
</form>

<script>
    let errorMsg = ""
    let error = false


    $('button').click(()=> {
        error = false
        errorMsg = ""
        idCheck()
        pwCheck()
        nameCheck()
        birthCheck()
        phoneCheck()

        if(error) {
            errorMsg += '가 형식에 맞지 않습니다.'
            alert(errorMsg)
            return
        } else {
            $('form').submit()
        }
    })

    function idCheck () {
        let val = $('input[name="id"]').val()
        const regex = /^[a-zA-Z]{4,8}$/.test(val)
        if(!regex) {
            console.log("sdf");
            errorMsg += '아이디, '
            error = true
        }
    }

    function pwCheck () {
        let val = $('input[name="pw"]').val()
        const regex = /^[a-zA-Z0-9]{4,8}$/.test(val)
        if(!regex) {
            errorMsg += '비밀번호, '
            error = true
        }
    }

    function nameCheck () {
        let val = $('input[name="name"]').val()
        const regex = /^[가-힣]{3}$/.test(val)
        if(!regex) {
            errorMsg += '이름, '
            error = true
        }
    }

    function birthCheck () {
        let val = $('input[name="birth"]').val()
        const regex = /\d{4}년\d{2}월\d{2}일/.test(val)
        if(!regex) {
            errorMsg += '생년월일, '
            error = true
        }
    }

    function phoneCheck () {
        let val = $('input[name="phone"]').val()
        const regex = /\d{3}-\d{4}-\d{4}/.test(val)
        if(!regex) {
            errorMsg += '전화번호, '
            error = true
        }
    }


</script>