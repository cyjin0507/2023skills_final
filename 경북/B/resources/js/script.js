
// 천안의 명소 페이지
class Place {
    constructor() {
        this.init()
    }

    init() {
        this.jsonData = []

        this.getJson()
        setInterval(async () => {
            await this.getJson()
        }, 4900)

        this.place = document.querySelector(".place .d-grid-4")
        this.reviewBox = document.querySelector(".new-review .d-grid-4")
        this.reviews = JSON.parse(localStorage.getItem('review'))

        this.getReviews()
    }

    // json 받아오기 
    async getJson() {
        let jsonData;
        await $.ajax({
            url: '/resources/json/place.json',
            dataType: 'json',
            cache: "false",
            success: function (res) {
                jsonData = res.data
            }
        });
        this.jsonData = jsonData

        this.place.innerHTML = ""
        this.setData()
    }

    // html에 넣기
    setData() {
        this.jsonData.forEach(x => {

            let point = x.point
            let reviewCnt = x.review_cnt
            let html;
            this.reviews.forEach(item => {
                if (item.idx == x.idx) {
                    if (point != 0) {
                        point = (point + item.star) / 2
                    } else {
                        point = item.star
                    }
                    reviewCnt = reviewCnt + 1
                }
            })
            html = `
            <div class="card">
            <img src="./resources/place/${x.idx}.jpg" alt="" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">제목 : ${x.title}</h5>
                <p class="card-text">별점 : ${point.toFixed(1)}</p>
                <p class="card-text">리뷰 수 : ${reviewCnt}</p>
                <p class="card-text">시내로부터의 거리 데이터 : ${x.distance}</p>
                <a href="./review.html?idx=${x.idx}&title=${x.title}" class="btn btn-primary">리뷰 작성 버튼</a>
            </div>
        </div>`

            this.place.innerHTML += html
        })
    }


    //최근 리뷰 영역
    getReviews() {

        this.reviews.forEach(x => {
            let html = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><b>이름 : ${x.name}</b></h5>
                    <p class="card-text">방문날짜 : ${x.date}</p>
                    <p class="card-text">별점 : ${x.star}</p>
                    <p class="card-text">내용 : ${x.text}</p>                
                </div>
            </div>
            `
            this.reviewBox.innerHTML += html
        })


    }
}


window.addEventListener('load', () => {
    if (window.location.href.includes("place")) {
        new Place()
    }
})

// 리뷰 작성 페이지
class Review {
    constructor() {
        this.init()
    }

    // 기본 세팅
    init() {
        this.idx = window.location.href.split('idx=')[1];
        this.idx = this.idx.slice(0, this.idx.indexOf('&'))
        this.title = window.location.href.split('title=')[1];

        this.name = document.form.name
        this.date = document.form.date
        this.star = document.form.star
        this.text = document.querySelector('#textarea')
        this.starText = document.querySelector('.star-text')
        this.btn = document.querySelector('input[type="button"]')

        this.addEvent()
    }

    //이벤트 추가
    addEvent() {
        this.date.setAttribute('max', new Date().myFormat())
        this.name.value = decodeURI(this.title)

        // 별 드래그 하면서 값 바꾸기
        this.star.addEventListener('input', () => {
            document.querySelector('.star span').style.width = `${this.star.value * 2}%`;
            this.starText.innerHTML = this.star.value / 10
        })

        // 값 체크
        this.btn.addEventListener('click', () => {
            if (this.date.value == "") {
                alert('방문날짜 값이 비였습니다.')
                return
            }
            if ((this.star.value / 10) == 0) {
                alert('별점 입력창 은 0점을 줄수 없습니다.')
                return
            }
            if (this.text.value == "") {
                alert('리뷰 내용 입력창 값이 비였습니다.')
                return
            }


            let reviews = JSON.parse(localStorage.getItem('review')) ?? []
            let data = {
                idx: this.idx,
                name: this.name.value,
                date: this.date.value,
                star: this.star.value / 10,
                text: this.text.value
            }
            reviews.push(data)
            localStorage.setItem('review', JSON.stringify(reviews))
            window.location.href = './place.html'
        })
    }
}


window.addEventListener('load', () => {
    if (window.location.href.includes("review")) {
        new Review()
    }
})

// 게임 페이지
class Game {
    constructor() {
        this.init()
    }

    init() {
        this.name = document.querySelector('#name')
        this.snakeBtn = document.querySelector('.snake-btn')
        this.walnutBtn = document.querySelector('.walnut-btn')

        this.addEvent()
    }
    addEvent() {
        this.snakeBtn.addEventListener('click', () => {
            if(this.name.value != "") {
                window.location.href = './snake.html?name=' + this.name.value
            } else {
                alert('이름이 비였습니다.')
            }
        })
        this.walnutBtn.addEventListener('click', () => {
            if(this.name.value != "") {
            window.location.href = './walnut.html?name=' + this.name.value
            } else {
                alert("이름이 비였습니다.")
            }
        })
    }

}

window.addEventListener('load', () => {
    if (window.location.href.includes("game")) {
        new Game()
    }
    else if (window.location.href.includes("snake")) {
        new Snake()
    }
    else if (window.location.href.includes("walnut")) {
        new Walnut()
    }
})


//스네이크 게임
class Snake {
    constructor() {
        this.init()
    }

    init() {
        this.nameText = window.location.href.split('name=')[1];
        this.name = document.querySelectorAll('.name')
        this.scoreText = document.querySelectorAll('.score')
        this.time = document.querySelector('#time')
        this.pauseBtn = document.querySelector('.pause')
        this.resetBtn = document.querySelector('.reset')
        this.modal = document.querySelector('.modal')
        this.body = document.querySelector('body')

        this.score = 0;
        this.LR = 0; // 좌우 방향
        this.TB = 1; // 위아래 방향
        this.mapSize = 30; //map size
        this.gameInterval, this.timer;
        this.min = 3
        this.sec = 0
        this.isStop = false;
        this.isReverse = false;
        this.firstHead, this.lastHead
        this.turn = []


        //snake
        this.snake = new Array();
        //food
        this.food = new Array();

        this.addEvent()

        this.reset()
        this.start()
    }

    //이벤트 추가
    addEvent() {
        this.name.forEach(x => {
            x.innerHTML = decodeURI(this.nameText)
        })
        this.body.addEventListener('keydown', e => this.gameKey(e))
        this.resetBtn.addEventListener('click', () => {
            this.reset()
            this.start()
        })
        this.pauseBtn.addEventListener('click', () => {
            this.stop()
        })
        this.resetBtn.addEventListener('click', () => {
            this.reset()
            this.start()
        })
    }

    // key 이벤트
    gameKey(event) {
        if (event.key == 'ArrowUp') {
            this.turn.push({
                xy: [this.snake[0][0], this.snake[0][1]],
                type: 'north'
            })
            this.up();
        } else if (event.key == 'ArrowDown') {
            this.turn.push({
                xy: [this.snake[0][0], this.snake[0][1]],
                type: 'south'
            })
            this.down();
        } else if (event.key == 'ArrowLeft') {
            this.turn.push({
                xy: [this.snake[0][0], this.snake[0][1]],
                type: 'west'
            })
            this.left();
        } else if (event.key == 'ArrowRight') {
            this.turn.push({
                xy: [this.snake[0][0], this.snake[0][1]],
                type: 'east'
            })
            this.right();
        }
    }

    //랜덤 함수 생성
    getRandom(min, max) {
        let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return ranNum;
    }


    // 맵 생성
    createMap() {
        let html = '';
        for (let i = 0; i < this.mapSize; i++) {
            html += '<tr>';

            let row = '';
            for (let j = 0; j < this.mapSize; j++) {
                row += '<td id="block' + i + '_' + j + '"><span></span></td>';
            }

            html += row + '</tr>';
            snakeTable.innerHTML = html
        }
    }

    // 뱀 생성
    createSnake() {
        this.snake = [];
        this.snake.push([0, 1]);
        this.drawSnake();
    }

    //뱀 그리기
    drawSnake() {
        let state = '';
        $('#snakeTable td').removeClass('snake');
        for (let i = 0; i < this.snake.length; i++) {
            $(`#block${this.snake[i][0]}_${this.snake[i][1]}`).addClass('snake');

            //먹이 먹었을 때
            if ($(`#block${this.snake[i][0]}_${this.snake[i][1]}`).hasClass('food')) {
                this.score++; // 점수 증가
                this.scoreText.forEach(x => {
                    x.innerHTML = this.score //점수 반영
                })
                this.food.pop(); // 먹이 제거
                this.initFood(); // 새로운 먹이 추가
                //뱀 꼬리 늘리기
                state = 'eat';
            }
        }
        return state;
    }

    // 먹이 초기화
    initFood() {
        let x;
        let y;

        do {
            x = this.getRandom(0, this.mapSize - 1);
            y = this.getRandom(0, this.mapSize - 1);
        } while ($('#block' + x + '_' + y).hasClass('snake')); // 뱀이랑 겹치면 다시

        this.food = [];
        this.food.push([x, y]);
        this.drawFood();
    }

    //먹이 그리기
    drawFood() {
        $('#snakeTable td').removeClass('food');
        for (let i = 0; i < this.food.length; i++) {
            $(`#block${this.food[i][0]}_${this.food[i][1]}`).addClass('food');
        }
    }


    // 움직이기
    move() {
        let head = new Array();
        head[0] = this.snake[0][0];
        head[1] = this.snake[0][1];
        let last = this.snake.slice(-1)

        // 벽을 만난건지 체크
        let tmp = head[0] + 1 * this.TB;
        if (tmp >= 0 && tmp < this.mapSize) {
            head[0] = tmp;
        } else {
            this.gameOver()
            return;
        }

        tmp = head[1] + 1 * this.LR;
        if (tmp >= 0 && tmp < this.mapSize) {
            head[1] = tmp;
        } else {
            this.gameOver()
            return;
        }

        // 움직이는 애니메이션 방향 조절
        $('#snakeTable span').removeClass()
        let headDiv = $(`#block${head[0]}_${head[1]} span`)
        let lastDiv = $(`#block${last[0][0]}_${last[0][1]} span`)
        
        if (this.turn[0] && this.turn[0].xy[0] == last[0][0] && this.turn[0].xy[1] == last[0][1]) {
            lastDiv.addClass(this.turn[0].type)
            this.turn.slice(0, 1)
        }
        console.log(this.turn);
        if (this.TB == 1) {
            //아래로 내려올때
            if (this.isReverse) {
                $('#snakeTable span').css({ 'animation-direction': 'normal' })
                this.isReverse = false
            }
            headDiv.addClass('south')
            lastDiv.addClass('north')
            this.isReverse = false
        } else if (this.TB == - 1) {
            //위로 올라갈때
            if (!this.isReverse) {
                $('#snakeTable span').css({ 'animation-direction': 'reverse' })
                this.isReverse = true
            }
            headDiv.addClass('north')
            lastDiv.addClass('south')
        } else if (this.LR == - 1) {
            // 왼쪽
            if (this.isReverse) {
                $('#snakeTable span').css({ 'animation-direction': 'normal' })
                this.isReverse = false
            }
            headDiv.addClass('east')
            lastDiv.addClass('west')
        } else if (this.LR == 1) {
            // 오른쪽
            if (!this.isReverse) {
                $('#snakeTable span').css({ 'animation-direction': 'reverse' })
                this.isReverse = true
            }
            headDiv.addClass('west')
            lastDiv.addClass('east')
        }

        // 몸통을 만난건지 체크
        if ($(`#block${head[0]}_${head[1]}`).hasClass('snake')) {
            this.gameOver()
            return;
        }


        this.snake.unshift(head);

        if (this.drawSnake() != 'eat') { //먹은게 아니면
            this.snake.pop(); //꼬리 연장 X
        }
    }

    //남은 시간 설정하기
    timeCheck() {
        this.timer = setInterval(() => {
            if (this.sec != 0) {
                this.sec--;
            } else {
                if (this.min != 0) {
                    this.min--;
                    this.sec = 59
                } else {
                    this.gameOver()
                }
            }
            this.time.innerHTML = this.min + ":" + this.sec
        }, 1000)
    }


    // 전환할때 이벤트
    left() {
        if (this.TB == 0) return; // 반대방향으로 방향전환 불가
        this.LR = -1;
        this.TB = 0;
    }
    right() {
        if (this.TB == 0) return; // 반대방향으로 방향전환 불가
        this.LR = 1;
        this.TB = 0;
    }
    up() {
        if (this.LR == 0) return; // 반대방향으로 방향전환 불가
        this.LR = 0;
        this.TB = -1;
    }
    down() {
        if (this.LR == 0) return; // 반대방향으로 방향전환 불가
        this.LR = 0;
        this.TB = 1;
    }


    // 모두 새로고침
    initAll() {
        this.score = 0;
        this.createMap();
        this.initFood();
        this.createSnake();
        this.LR = 0;
        this.TB = 1;
        this.min = 3
        this.sec = 0
        this.isStop = false;
        this.pauseBtn.value = "일시정지"
        this.time.innerHTML = "3:0"
    }

    //시작
    start() {
        this.gameInterval = setInterval(this.move.bind(this), 500);
        this.timeCheck()
    }
    //멈추기
    stop() {

        if (!this.isStop) {
            clearInterval(this.timer)
            clearInterval(this.gameInterval);
            this.pauseBtn.value = "재생버튼"
            this.isStop = true
            $('#snakeTable span').css({ 'animation-play-state': 'paused' })
        } else {
            this.start()
            this.pauseBtn.value = "일시정지"
            this.isStop = false
            $('#snakeTable span').css({ 'animation-play-state': 'running' })
        }
    }

    //리셋
    reset() {
        this.initAll()
        clearInterval(this.timer)
        clearInterval(this.gameInterval);
    }

    // 게임 오버 화면 띄우기
    gameOver() {
        clearInterval(this.timer)
        clearInterval(this.gameInterval);
        this.modal.style.display = "block"
    }


}



//호두 떨어지는 게임
class Walnut {
    constructor() {
        this.init()
    }

    async init() {
        this.nameText = window.location.href.split('name=')[1];
        this.name = document.querySelectorAll('.name')
        this.scoreText = document.querySelectorAll('.score')
        this.time = document.querySelector('#time')
        this.modal = document.querySelector('.modal')
        this.body = document.querySelector('body')
        this.canvas = document.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // 게임 상태 변수
        this.isGameOver = false;
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            radius: 20
        };
        this.food = [];

        this.score = 0;
        this.gameInterval, this.timer;
        this.min = 3
        this.sec = 0
        this.timeSet = 0;

        this.addEvent()
        this.start()
    }

    //이벤트 추가
    addEvent() {
        this.name.forEach(x => {
            x.innerHTML = decodeURI(this.nameText)
        })
        this.body.addEventListener('keydown', e => this.gameKey(e))
    }

    // key 이벤트
    gameKey(event) {
        if (!this.isGameOver) {
            if (event.key == 'ArrowLeft') {
                if (this.player.x <= 0) {
                    this.player.x = 0
                    return
                }
                this.player.x = this.player.x - 40
            } else if (event.key == 'ArrowRight') {
                if (this.player.x >= this.canvas.width - 50) {
                    this.player.x = this.canvas.width - 50
                    return
                }
                this.player.x = this.player.x + 40
            }
        }
    }
    //남은 시간 설정하기
    timeCheck() {
        this.timer = setInterval(() => {
            if (this.sec != 0) {
                this.sec--;
            } else {
                if (this.min != 0) {
                    this.min--;
                    this.sec = 59
                } else {
                    this.gameOver()
                }
            }
            this.time.innerHTML = this.min + ":" + this.sec
        }, 1000)
    }

    //시작
    start() {
        requestAnimationFrame(this.gameLoop.bind(this));
        this.timeCheck()
    }

    // 게임 오버 화면 띄우기
    gameOver() {
        this.modal.style.display = "block"
    }

    // 게임 루프 함수
    gameLoop() {

        // 게임 종료 시 게임 루프 중지
        if (this.isGameOver) {
            return;
        }
        this.timeSet++

        // 게임 상태 업데이트
        if (this.timeSet % 50 === 0) {
            let type = Math.floor(Math.random() * 2)
            let x = Math.random() * this.canvas.width
            this.food.push({
                x: x >= this.canvas.width - 50 ? x - 50 : x,
                y: 0,
                radius: 10,
                speed: 5 + this.timeSet / 2000,
                type: type,
                img: type == 0 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 3) + 4
            });
        }
        for (let i = 0; i < this.food.length; i++) {
            this.food[i].y += this.food[i].speed;
            if (this.food[i].y > this.canvas.height) {
                this.food.splice(i, 1);
                i--;
            } else {
                let distance = Math.sqrt(Math.pow(this.player.x - this.food[i].x, 2) + Math.pow(this.player.y - this.food[i].y, 2));
                // 충돌 검사
                // 크기값이 50임                
                if (distance < 50) {
                    if (this.food[i].type == 0) {
                        this.score++
                        this.food[i].type = 2
                    } else if (this.food[i].type == 1) {
                        this.score--
                        this.food[i].type = 2
                    }
                    if (this.score < 0) {
                        this.score = 0
                        this.isGameOver = true;
                        this.gameOver()
                    }
                    this.scoreText.forEach(x => {
                        x.innerHTML = this.score
                    })
                }
            }
        }

        // 게임 화면 그리기
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(GAME_IMG[0], this.player.x, this.player.y, 50, 50)

        for (let i = 0; i < this.food.length; i++) {
            this.ctx.drawImage(GAME_IMG[this.food[i].img], this.food[i].x, this.food[i].y, 50, 50)
        }

        // 다음 프레임 실행
        requestAnimationFrame(this.gameLoop.bind(this));
    }


}

const GAME_IMG = {}
//  이미지 준비
async function setGameImage() {
    //  0 : 캐릭터 사진, 1 ~ 3: 음식 사진 , 4 ~ 나머지 : 피해야할 사진
    GAME_IMG[0] = await getImage('/resources/game/car.png')
    GAME_IMG[1] = await getImage('/resources/game/grape.png')
    GAME_IMG[2] = await getImage('/resources/game/soondae.png')
    GAME_IMG[3] = await getImage('/resources/game/walnut-cookie.png')
    GAME_IMG[4] = await getImage('/resources/game/knife.png')
    GAME_IMG[5] = await getImage('/resources/game/pan.png')
    GAME_IMG[6] = await getImage('/resources/game/car.png')
}

setGameImage()

// 이미지 로드
async function getImage(src) {
    const img = document.createElement('img')

    return new Promise((res, rej) => {
        img.src = src

        img.onload = () => {
            res(img)
        }
        img.onerror = () => {
            res(false)
        }
    })
}


// 날짜 yyyy-mm-dd 로 자르기
function padstart(number, num = 2, str = '0') {
    return number.toString().padStart(num, str)
}
Date.prototype.myFormat = function () {
    return this.getFullYear().toString() + '-' + padstart(this.getMonth() + 1) + '-' + padstart(this.getDate())
}