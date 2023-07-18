class Popup {
    constructor(url, width = 700, height = 700) {
        this.url = url
        this.width = width
        this.height = height
    }

    async open(data) {


        if (!this.thisWindow || this.thisWindow.closed) {

            this.thisWindow = window.open(this.url, "팝업", `width=${this.width}, height=${this.height}, top=150, left=200, location=no`);
            await this.waitForLoad(this.thisWindow)
            this.document = this.thisWindow.document

            this.init()
            this.addEvent()
        }
        this.thisWindow.resizeTo(this.width, this.height)


        this.document = this.thisWindow.document
    }

    waitForLoad(element) {
        return new Promise((res, rej) => {
            element.onload = () => { res() }
            element.onerror = () => { rej() }


            setTimeout(() => {
                res()
            }, 300);
        })
    }
}



class ShowApp {
    constructor() {
        this.init()
    }

    init() {
        if (window.location.href.includes('user')) {

            this.btn = document.querySelector('.btn')
            this.btn.addEventListener('click', () => {
                localStorage.removeItem("show")
                if (!localStorage.getItem("show")) {
                    alert("방문자 정보가 필요한 서비스입니다")
                    this.requestShowPopup = new RequestShowPopup()
                    this.requestShowPopup.open()
                } else {
                    window.location.href = "./show.html?idx="
                }
            })
        } else {
            this.date = document.querySelector('#visit')
            this.date.addEventListener('change', () => {
                this.showPopup = new ShowPopup()
                this.showPopup.open()
            })

        }
    }
}

window.addEventListener('load', () => {
    if (window.location.href.includes('user') || window.location.href.includes('show')) {
        new ShowApp()
    }
})




class ShowPopup extends Popup {
    constructor() {
        super('./showPopup.html', 700, 400)
    }

    init() {

        this.time = this.document.querySelector('#time');
        this.person = this.document.querySelector('#person');
        this.btn = this.document.querySelector('.btn');
        this.item;
    }

    addEvent() {
        this.btn.addEventListener('click', () => {

            if (this.time.value == "") {
                this.thisWindow.alert("방문시간을 입력해주세요.")
                return
            }
            if (this.person.value == "") {
                this.thisWindow.alert("관람인원을 입력해주세요.")
                return
            }
            this.item = {
                time: this.time.value,
                person: this.person.value
            }

            this.thisWindow.alert("성공적으로 입력되었습니다.")


            this.thisWindow.close()
        })
    }

}


class RequestShowPopup extends Popup {
    constructor() {
        super('./reservationPopup.html', 700, 1000)
    }

    init() {

        this.phone = this.document.querySelector('#phone');
        this.pw = this.document.querySelector('#pw');
        this.pwCheck = this.document.querySelector('#pwCheck');
        this.btn = this.document.querySelector('.btn');
    }

    addEvent() {
        this.btn.addEventListener('click', () => {

            if (/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(this.phone.value) && this.phone.value == "") {
                this.thisWindow.alert("올바른 형태의 휴대폰 번호를 입력해주세요.")
                return
            }
            if (this.pw.value == "") {
                this.thisWindow.alert("비밀번호를 입력해주세요.")
                return
            }
            if (this.pwCheck.value != this.pw.value) {
                this.thisWindow.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
                return
            }

            localStorage.setItem("show", true);
            window.location.href = "./show.html?idx="

            this.thisWindow.close()
        })
    }

}

window.addEventListener('load', () => {
    if (window.location.href.includes("review")) {
        new Review()
    }
})

class Review {
    constructor() {
        this.init()
    }

    init() {
        var container = document.getElementById('container');
        var loadMoreButton = document.getElementById('loadMore');
        var visibleItems = 5;
        
        function loadMoreItems() {
          var hiddenItems = document.querySelectorAll('.item:not([style*="display: block"])');
          var numItemsToShow = Math.min(hiddenItems.length, 5);
          
          for (var i = 0; i < numItemsToShow; i++) {
            hiddenItems[i].style.display = 'block';
          }
          
          if (hiddenItems.length <= 5) {
            loadMoreButton.style.display = 'none';
          }
        }
        
        loadMoreButton.addEventListener('click', loadMoreItems);
        
    }

}