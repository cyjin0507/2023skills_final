import VideoManager from "./js/VideoManager"

export default class Screen {
    constructor() {
        this.startPoint = false
        this.endPoint = false
    }

    static setThumbnails(thumbnails) {
        for(let i=0; i<thumbnails.length; i++) {
            const thumbnail = thumbnails[i]
            const {url} = thumbnail
            const thumbnailImg = document.createElement('img')
            thumbnailImg.src = url

            const container = document.querySelectorAll('.thumbnail')[i]
            const containerImg = container.querySelector('img')

            if(containerImg) {
                container.removeChild(containerImg)
            }

            container.appendChild(thumbnailImg)
        }
    }

    static setVideo(elem) {
        const playVideoController = document.querySelector('#sawVideo')
        const playVideo = playVideoController.querySelector('video')
        const shortCutController = document.querySelector('.video')
        const shortCut = shortCutController.querySelector('video')

        if(playVideo) {
            playVideoController.removeChild(playVideo)
        }

        if(shortCut) {
            shortCutController.removeChild(shortCut)
        }

        const copyVideo = elem.cloneNode(true)
        playVideoController.append(elem)
        shortCutController.append(copyVideo)
    }

    static setShortCut(elem) {
        const shortCutController = document.querySelector('.video')
        const shortCut = shortCutController.querySelector('video')

        if(shortCut) {
            shortCutController.removeChild(shortCut)
        }

        shortCutController.appendChild(elem)
    }

    static updateVideoTime(value) {
        document.querySelector('.video-time .current').innerText = convertToHMS(value)
    }
    
    static updateVideoDuration(value) {
        document.querySelector('.video-time .duration').innerText = convertToHMS(value)
    }

    static updateVideoIndex(value) {
        document.querySelector('.video-index .current').innerText = value
    }

    static updateVideoTotal(value) {
        document.querySelector('.video-index .total').innerText = value
    }

    static setVideoTime(time, duration) {
        Screen.updateVideoTime(time)
        Screen.updateVideoDuration(duration)
    }

    static setVideIndex(index, total) {
        Screen.updateVideoIndex(index)
        Screen.updateVideoTotal(total)
    }

    static setVideoFilename(filename) {
        document.querySelector('.video-filename').innerText = filename
    }

    static setButtons() {
        const prevBtn = document.querySelector('.prev-btn')
        const nextBtn = document.querySelector('.next-btn')

        prevBtn.disabled = VideoManager.disabledPrevVideo
        nextBtn.disabled = VideoManager.disabledNextVideo
    }

    static changeVideo(video) {
        const {flle, thumbnails, elem, duration} = video

        Screen.setThumbnails(thumbnails)
        Screen.setShortCut(elem)
        Screen.setVideIndex(elem)
        Screen.setVideoFilename(file.name)
        Screen.setVideoTime(0, duration)
        Screen.setButtons()
    }

    static setVideoList() {
        const videos = VideoManager.videos
        const videoList = document.querySelector('.video-list')
        videoList.innerHTML = ''

        videos.forEach((video, i)=> {
            const {elem, file, thumbnails} = video
            const thumbnail = thumbnails.at(1)

            videoList.insertAdjacentHTML(
                'beforeend',
                `
                    <div class="video-item" data-video="${i}" data-index="${elem.serial}">
                        <img src="${thumbnail.url}">
                        <div class="filename">${file.name}</div>
                    </div>
                `
            )
        })
    }

    static checkEndTime() {
        const sawVideo = document.querySelector('#sawVideo')
        sawVideo.addEventListener('timeupdate', update)

        function update() {
            let timeOffset = document.querySelector('#endLine').style.width
            timeOffset = 1280 - parseInt(timeOffset.substr(0,timeOffset.length-2))
            let percent = (timeOffset / 1280) * 100
            let time = VideoManager.videoDuration * percent / 100

            if(sawVideo.currentTime >= time) {
                let timeOffset = document.querySelector('#startLine').style.width
                timeOffset = parseInt(timeOffset.substr(0,timeOffset.length-2))

                const ajectTime = VideoManager.getBarTime(timeOffset)
                sawVideo.currentTime = ajectTime

                sawVideo.pause()
                return
            }
        }
    }

    static setStartingPoint(startPoint) {
        this.startPoint = startPoint
    }

    static getStartingPoint() {
        return this.startPoint
    }

    static setEndPoint(endPoint) {
        this.endPoint = endPoint
    }

    static getEndPoint() {
        return this.endPoint
    }

}