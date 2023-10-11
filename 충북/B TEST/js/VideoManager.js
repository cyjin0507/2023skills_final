import Video from "./Video"

export default class VideoManager {
    static index = 0
    static videos = []

    static async uploadVideos(e) {
        let files = e.target.files
        let uploadVideos = []
        for(let i=0; i<files.length; i++) {
            const file = files[i]
            const video = new Video(file)
            this.videos.push(video)
            uploadVideos.push(video.init())
        }

        await Promise.all(uploadVideos)
    }

    static updateVideoIndex(step) {
        const {index, videos} = VideoManager
        VideoManager.index = (index + videos.length + step) % videos.length
    }

    static getPrevVideo() {
        VideoManager.updateVideoIndex(-1)
        return VideoManager.videos.at(VideoManager.index)
    }

    static getNextVideo() {
        VideoManager.updateVideoIndex(1)
        return VideoManager.videos.at(VideoManager.index)
    }
    
    static getTargetVideo(targetIndex) {
        VideoManager.updateVideoIndex(targetIndex - VideoManager.index)
        return VideoManager.videos.at(VideoManager.index)
    }

    static jumpToThumbnailTime(index) {
        const {elem, thumbnails} = VideoManager.currentVideo
        const thumbnail = thumbnails[index]
        if(thumbnail) {
            const {time} = thumbnail
            document.querySelector('.video video').currentTime = time
            document.querySelector('#sawBar').style.left = 128 * index + "px"

            return time
        }
        return elem.currentTime
    }

    static dragThumbnailTime(percent) {
        const {duration} = VideoManager.currentVideo
        const time = duration * percent / 100
        document.querySelector('.video video').currentTime = time
    }

    static setTime(time) {
        const {elem} = VideoManager.currentVideo
        elem.currentTime = time
    }

    static getBarTime(timeOffset) {
        const {duration} = VideoManager.currentVideo
        const ajectTime = parseInt(duration * (timeOffset / 1280))
        return ajectTime
    }

    static deleteVideo(index) {
        this.videos.splice(index,1)
    }

    static get currentVideo() {
        return VideoManager.videos.at(VideoManager.index)
    }

    static get disabledPrevVideo() {
        return VideoManager.index === 0
    }

    static get disabledNextVideo() {
        return VideoManager.index === 0
    }

    static get videoElem() {
        return VideoManager.currentVideo.elem
    }

    static get videoDuration() {
        return VideoManager.currentVideo.duration
    }

}