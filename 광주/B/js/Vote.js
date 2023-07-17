
class Vote {
    constructor() {
        this.star = new Star()
        this.init()
    }

    init() {
        this.voteList = []

        this.addEvent()
    }

    addEvent() {
        $('.modal-img').click((e)=> {
            this.voteName = e.target.dataset.name
            this.index = e.target.dataset.idx
            $('#vote-modal').fadeIn()
        })

        $('.close').click(this.reset.bind(this))

        $('#vote-btn').click(this.vote.bind(this))
    }

    reset() {
        $('#vote-modal').fadeOut()
        this.star.reset()
    }

    vote() {
        this.score = this.star.val()

        if(this.voteList.find(x=> x.name == this.voteName)) {
            // filter 써도 됐던 것 같은데 안됨
            this.voteList.forEach(x=> {
                if(x.name == this.voteName) {
                    x.cnt++
                    x.score += this.score
                }
            })
            // this.voteList.filter(x=> x.name == this.voteName)[0].cnt++
            // this.voteList.filter(x=> x.name == this.voteName)[0].cnt += this.score

        } else {
            this.voteList.push({
                "idx" : this.index,
                "name" : this.voteName,
                "score" : this.score,
                "comment" : "",
                "cnt" : 1
            })
        }

        this.sort()
        this.reset()
    }

    sort() {
        let arr = []
        this.voteList.forEach((x,i)=> {
            if(i==0) {arr.push(x)} else {
                for(let j=0; j<arr.length; j++) {
                    if(arr[j].score < x.score) {
                        arr.splice(j,0,x)
                        break
                    } else if(j==arr.length-1) {
                        arr.push(x)
                        break
                    }
                }

            }
        })
        this.voteList = arr

        new Slide(this.voteList)
        new Rank(this.voteList)
    }

    val() {
        return this.voteList
    }

}
