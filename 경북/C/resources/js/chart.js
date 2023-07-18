class Chart {
    constructor() {
        this.init()
    }

    // 기본 세팅
    async init() {
        await this.setData()

        // 캔버스 요소 생성
        this.svg = document.getElementById("chart");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");

        this.addEvent()
    }

    // 같은 날짜 데이터 합치기
    setData() {

        this.data = JSON.parse(document.querySelector('.hidden').innerHTML).reverse()
        let newArray = [];

        // 날짜를 기준으로 객체를 그룹화
        let groupedData = this.data.reduce(function (result, item) {
            let key = item.visit;
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
            return result;
        }, {});        

        // 그룹화된 객체를 합쳐서 새로운 배열 생성
        for (let key in groupedData) {            
            let rate = 0
            groupedData[key].forEach(x => {
                rate += parseFloat(x.rate)
            });         
            rate = Math.round((rate/ groupedData[key].length) * 10) / 10
            let mergedItem = groupedData[key].reduce(function (result, item) {                
                result.visit = item.visit;                                      
                result.rate = rate;                             
                return result;
            }, {rate : 0});

            newArray.push(mergedItem);
        }
        this.data = newArray        
    }

    addEvent() {
        // 꺽은선 그래프 그리기
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d = "M " + this.convert(0, this.data[0].rate * 10).x + " " + this.convert(0, this.data[0].rate * 10).y;

        for (let i = 1; i < this.data.length; i++) {
            d += " L " + this.convert(i, this.data[i].rate * 10).x + " " + this.convert(i, this.data[i].rate * 10).y;
        }

        path.setAttribute("d", d);
        path.setAttribute("class", "line");
        this.svg.appendChild(path);

        // X축 라벨 추가
        for (let i = 0; i < this.data.length; i++) {
            let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", this.convert(i, this.data[i].rate * 10).x);
            label.setAttribute("y", this.svg.clientHeight);
            label.setAttribute("class", "label");
            label.setAttribute("text-anchor", "middle");
            label.textContent = new Date(this.data[i].visit).myFormat2();
            this.svg.appendChild(label);
        }

        // Y축 레이블 추가
        let j = 5
        for (let i = 0; i < this.data.length; i++) {
            let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", 10);
            label.setAttribute("y", i * 60 + 20);
            label.setAttribute("class", "label");
            label.setAttribute("text-anchor", "end");
            label.setAttribute("dominant-baseline", "middle");
            label.textContent = j--;
            this.svg.appendChild(label);
        }
    }

    // 좌표 변환 함수
    convert(x, y) {
        let newX = (x / (this.data.length - 1)) * (this.svg.clientWidth - 70) + 40;
        let newY = this.svg.clientHeight - (y / Math.max(...this.data.map(item => item.rate * 10))) * (this.svg.clientHeight - 50) - 40;
        return { x: newX, y: newY };
    }
}


function padstart(number, num = 2, str = '0') {
    return number.toString().padStart(num, str)
}
Date.prototype.myFormat2 = function () {
    return padstart(this.getMonth() + 1) + '.' + padstart(this.getDate())
}

new Chart()