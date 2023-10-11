export default class Video {
    constructor(file) {
        this.file = file
        this.url = URL.createObjectURL(file)
        this.thumbnails = []
        this.thumbnailWidth = 200
        this.thumbnailHeight = 140
        this.thumbnailCount = 10
        this.elem = document.createElement('video')
    }

    async init() {
        await this.laodVideo()
        this.thumbnails = await this.makeThumbnails(this.thumbnailCount)
    }

    async laodVideo() {
        const {elem} = this

        return new Promise((res)=> {
            elem.preload = "metadata"
            elem.src = this.url
            elem.serial = Math.random() * Math.random() * 10000
            elem.onloadedmetadata = function() {
                res()
            }
        })
    }

    get duration() {
        return this.elem?.duration ?? 0
    }

    async makeThumbnails(thumbnailCount) {
        const {elem, duration, thumbnailWidth, thumbnailHeight} = this
        const segement = duration / thumbnailCount
        const thumbnails = []

        for(let i=0; i<thumbnailCount; i++) {
            const time = segement * i + 1
            const thumbnail = await this.makeThumbnail(
                time,
                thumbnailWidth,
                thumbnailHeight
            )

            thumbnails.push(thumbnail)
        }

        elem.currentTime = 0

        return thumbnails
    }

    async makeThumbnail(time, width, height) {
        const {elem} = this
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        return new Promise((res)=> {
            elem.currentTime = time
            elem.addEventListener(
                "seeked",
                ()=> {
                    ctx.drawImage(elem,0,0,width.height)
                    res({
                        time,
                        url : canvas.toDataURL('image/jpg')
                    })
                },
                {once:true}
            )
        })
    }

}