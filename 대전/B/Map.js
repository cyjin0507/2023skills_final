class Map {
    constructor() {
        this.mapImg = new Image();
        this.mapImg.src = './imgs/map.png'
        this.mapImg.onload = () => {
            window.scrollTo(0,0)
            this.init()
            this.ctx.drawImage(this.mapImg, 0, 0, 700, 700)
        }
    }

    init() {
        this.locArr = []
        this.alpha = ['A','B','C','D','E','F','G','H','I','J']

        this.draggable = false

        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        
        setTimeout(()=> {
            this.canvasLoc = this.canvas.getBoundingClientRect()
        },500)

        this.ride = "walk"

        this.addEvent()
    }

    addEvent() {
        $('#asset').on('mousedown', ()=>{
            this.draggable = true
        })

        $('body').on('mouseup', ()=> {
            this.draggable = false
        })

        this.img = new Image();
        this.img.src = './imgs/Asset 6.png'

        this.img.onload = () => {
            $('#canvas').on('mousemove', this.assetSet.bind(this))
        }
        

        $('#canvas').on('mouseup', this.assetSave.bind(this))

        $('#distance-btn').click(this.setDistance.bind(this))

        $('#ride-select').change((e)=> {
            this.ride = e.target.value
        })

        $('#canvas').click(this.assetDelete.bind(this))

        $('#reset-btn').click(this.reset.bind(this))
        $('#save-btn').click(this.save.bind(this))
        $('#print-btn').click(this.print.bind(this))
    }

    assetDelete(e) {
        const clickX = e.pageX - this.canvasLoc.x
        const clickY = e.pageY - this.canvasLoc.y

        this.locArr.forEach((x,i)=> {
            if((x.x > clickX - 32 && x.x < clickX) && (x.y > clickY - 45 && x.y < clickY)) {
                this.locArr.splice(i,1)
            }
        })
        this.saveLocDraw()
        this.setDistance()
    }

    assetSet(e) {
        if(!this.draggable) {return}
        this.x = e.pageX - this.canvasLoc.x
        this.y = e.pageY - this.canvasLoc.y

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = 'hotpink';

        this.saveLocDraw()

        this.ctx.drawImage(this.img, this.x, this.y, 32, 45)
        this.ctx.fillText(this.alpha[this.locArr.length], this.x + 11, this.y + 20)
    }

    saveLocDraw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.mapImg, 0,0,700,700)
        this.locArr.forEach((x,i)=> {
            this.ctx.drawImage(this.img,x.x,x.y,32,45)
            this.ctx.fillText(x.alpha, x.x + 11, x.y + 20)
        })
    }

    assetSave() {
        if(!this.draggable) {return}
        this.locArr.push({
            "idx" : this.locArr.length,
            "alpha" : this.alpha[this.locArr.length],
            "x" : this.x,
            "y" : this.y
        })
    }

    // 순열 알고리즘을 통해 경우의 수를 배열에 담음
    setDistance() {
        if(this.locArr.length < 2) {return}

        let dish = []
        this.locArr.forEach(x=> {
            dish.push(x.alpha)
        })

        let sliceCnt = 1
        for(let i=this.locArr.length-1; i>=1; i--) {
            sliceCnt *= i
        }

        const permutation = (permu, rests, output) => {
            if (rests.length == 0) {
                return output.push(permu);
            }
            rests.forEach((v,idx) => {
                const rest = [...rests.slice(0,idx), ...rests.slice(idx+1)]
                permutation([...permu,v], rest, output);
            })
        }
        
        const output = [];
        permutation([], dish, output);

        this.numberCase = output.slice(0, sliceCnt)

        this.getDistance()
    }

    getDistance() {
        let disArr = []
        this.numberCase.forEach(x=> {
            let dis = []
            let total = 0
            for(let i=0; i<x.length-1; i++) {
                dis.push(this.calcDistance(x[i], x[i+1]))
                total += this.calcDistance(x[i], x[i+1])
            }
            disArr.push({
                x,
                dis,
                "total" : total
            })
        })

        this.sortDistance(disArr)
    }

    calcDistance(loc1, loc2) {
        let loc1Data = this.locArr.find(x=> x.alpha==loc1)
        let loc2Data = this.locArr.find(x=> x.alpha==loc2)

        let x = Math.abs(loc1Data.x - loc2Data.x)
        let y = Math.abs(loc1Data.y - loc2Data.y)

        let dis = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
        return Math.round(dis / 100)
    }

    sortDistance(disArr) {
        let arr = []
        disArr.forEach((x,i)=> {
            if(i==0) {arr.push(x)} else {
                for(let j=0; j<arr.length; j++) {
                    if(arr[j].total > x.total) {
                        arr.splice(j,0,x)
                        break
                    } else if(j==arr.length-1) {
                        arr.push(x)
                        break
                    }
                }
            }
        })

        this.drawDisList(arr)
    }

    drawDisList(arr) {
        $('tbody').html('')

        arr.forEach((x,i)=> {
            let dis = ""

            x.x.forEach((k,j)=> {
                let long = 0
                if(j!=0) {
                    long = x.dis[j-1]
                    dis += ' -> '
                }
                dis += `${k}(${long}km)`
            })

            $('tbody').append(`
                <tr>
                    <td>${i+1}</td>
                    <td>${dis}</td>
                    <td>${x.total}</td>
                    <td>${this.time(x.total)}</td>
                </tr>
            `)
        })
    }

    time(dis) {
        let speed = 0
        if(this.ride == "walk") {speed = 4}
        else if(this.ride == "bike") {speed = 10}
        else if(this.ride == "car") {speed = 60}

        return dis / speed * 60
    }

    reset() {
        this.locArr = []
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.mapImg, 0,0,700,700)
        $('tbody').html('')
    }

    save() {
        const image = this.canvas.toDataURL()
        const link = document.createElement("a")
        link.href = image
        link.download = "map"
        link.click()
    }

    print() {
        $('.modal img').attr('src', this.canvas.toDataURL())
        $('.modal').fadeIn()

        $('.close').click(()=> {$('.modal').fadeOut()})
    }

}

new Map()