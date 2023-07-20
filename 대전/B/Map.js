class Map {
    constructor() {
        this.mapImg = new Image();
        this.mapImg.src = './imgs/map.png'
        this.mapImg.onload = () => {
            this.init()
            this.ctx.drawImage(this.mapImg, 0, 0, 700, 700)
        }
    }

    init() {
        this.locArr = []
        this.alpha = ['A','B','C','D','E']

        this.draggable = false

        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvasLoc = this.canvas.getBoundingClientRect()

        this.addEvent()
    }

    addEvent() {
        $('#asset').on('mousedown', ()=>{
            this.draggable = true
        })

        $('body').on('mouseup', ()=> {
            this.draggable = false
        })

        $('#canvas').on('mousemove', (e)=>{
            const img = new Image();
            img.src = './imgs/Asset 6.png'
            img.onload = () => {
                this.assetSet(e, img)
            }
        })

        $('#canvas').on('mouseup', this.assetSave.bind(this))

        $('#distance-btn').click(this.calcDistance.bind(this))
    }

    assetSet(e, img) {
        if(!this.draggable) {return}
        this.x = e.pageX - this.canvasLoc.x
        this.y = e.pageY - this.canvasLoc.y

        this.ctx.font = "16px Arial";

        this.saveLocDraw(img)

        this.ctx.drawImage(img, this.x, this.y, 32, 45)
        this.ctx.fillText(this.alpha[this.locArr.length], this.x + 11, this.y + 20)
    }

    saveLocDraw(img) {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.mapImg, 0,0,700,700)
        this.locArr.forEach((x,i)=> {
            this.ctx.drawImage(img,x.x,x.y,32,45)
            this.ctx.fillText(x.alpha, x.x + 11, x.y + 20)
        })
    }

    assetSave() {
        this.locArr.push({
            "idx" : this.locArr.length,
            "alpha" : this.alpha[this.locArr.length],
            "x" : this.x,
            "y" : this.y
        })
    }

    // 순열 알고리즘을 통해 경우의 수를 배열에 담음
    calcDistance() {
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
        
    }

}

new Map()