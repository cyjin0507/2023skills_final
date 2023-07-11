class Slide {
    constructor() {
        this.imgs = $('.slide-box > img')

        this.addEvent()

        // 이전 스크롤 위치 기억
        this.lastScroll = 0
    }

    addEvent() {
        $(document).on('scroll', this.scrollFunc.bind(this))
    }

    scrollFunc(e) {
        let scrollLoc = document.documentElement.scrollTop

        // 스크롤 너무 빨리 하면 인식 못해서 오차범위 설정
        if(scrollLoc % 300 > 60) {return}

        // 움직일 이미지 인덱스 설정
        let index = Math.floor(scrollLoc / 300) + 1
        
        // 다운이면 나옴
        if(this.scrollType() == 'down') {
            $(this.imgs[index]).css('left', '50%')
        } else {
            // 업일때 상위 2개는 움직임 없음
            if(index <= 1) {return}
            if(index % 2 == 0) {
                $(this.imgs[index]).css('left', '115%')
            } else {
                $(this.imgs[index]).css('left', '-15%')
            }
        }

    }

    scrollType() {
        const scrollY = window.scrollY;
  
        // 이전의 스크롤 위치와 비교하기
        const direction = scrollY > this.lastScroll ? "down" : "up";
        
        // 현재의 스크롤 값을 저장
        this.lastScroll = scrollY;
        
        return direction
    }

}

new Slide()