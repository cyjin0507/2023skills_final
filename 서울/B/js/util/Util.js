// 돔 가져오기
function dom(dom,name) {
    return $(dom.querySelector(name))
}

function domAll(dom,name) {
    return $(dom.querySelectorAll(name))
}