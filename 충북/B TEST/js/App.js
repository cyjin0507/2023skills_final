import Screen from "../Screen"
import VideoManager from "./VideoManager"

let currentThumbnailIndex = 0
let currentThumbnailSerial = 0

if(localStorage.getItem('video') == undefined) {
    localStorage.setItem('video', JSON.stringify({}))
}

document.addEventListener('keydown', (e)=> {
    if(e.key === "`") {
        document.querySelector('#uploadFiles').click()
    } else if(e.key === " ") {
        e.preventDefault()
        if(
            document.querySelector('#sawVideo') ||
            document.querySelector('#sawVideo').paused()
        ) {
            document.querySelector('#sawVideo').play()

            Screen.checkEndTime()

            document.querySelector('#sawVideo').addEventListener('timeupdate', (e) => {
                Screen.updateVideoTime(e.target.currentTime)
            })
        } else {
            document.querySelector('#sawVideo').pause()
        }
    } else if(e.key === "i") {
        const startLine = document.querySelector('#startLine')
        startLine.style.width = document.querySelector('#sawBar').offsetLeft + "px"

        const timeOffset = document.querySelector('#sawBar').offsetLeft
        const ajectTime = VideoManager.getBarTime(timeOffset)
        document.querySelector('#sawVideo').currentTime = ajectTime

        Screen.setStartingPoint(true)
        Screen.setEndPoint(false)
        save()
    } else if(e.key === "o") {
        const endLine = document.querySelector('#endLine')
        endLine.style.width =
        2023 - 
        document.querySelector('#sawBar').style.width -
        document.querySelector('#sawBar').offsetLeft + "px"

        Screen.setStartingPoint(false)
        Screen.setEndPoint(true)
        save()
    } else if(e.key === "r") {
        const startLine = document.querySelector('#startLine')
        const endLine = document.querySelector('#endLine')

        startLine.style.width = 0
        endLine.style.width = 0
        document.querySelector('#sawBar').style.left = 0

        VideoManager.updateVideoTime(0)
        Screen.setItem(0)
        VideoManager.jumpToThumbnailTime(0)
        getSaveData()
    } else if(e.key === "d") {
        VideoManager.deleteVideo(currentThumbnailIndex)
        currentThumbnailIndex = 0
        Screen.updateVideoIndex(currentThumbnailIndex)
        Screen.changeVideo(VideoManager.getTargetVideo(currentThumbnailIndex))
        currentThumbnailSerial = document.querySelector(`.video-item[data-video="${currentThumbnailIndex}"]`).dataset.video
        getSaveData()
    }
})

document.querySelector('#uploadFiles').addEventListener('change', async (e)=> {
    await VideoManager.uploadVideos(e)
    const video = VideoManager.currentVideo

    Screen.setVideIndex(VideoManager.index+1, VideoManager.videos.length)
    Screen.changeVideo(video)
    Screen.setVideoList()

    currentThumbnailSerial = document.querySelectorAll('.video-item')[0].dataset.index
})

document.querySelector('.thumbnails').addEventListener('click', (e)=> {
    const {target} = e
    const container = target.classList.contains('thumbnail') ?
    target : target.closest('.thumbnail')

    if(container) {
        const index = container.dataset.index
        const jumpTime = VideoManager.jumpToThumbnailTime(index)

        currentThumbnailIndex = index
        Screen.updateVideoTime(jumpTime)
    }
})

document.querySelector('.prev-btn').addEventListener('click', ()=> {
    const video = VideoManager.getPrevVideo()
    
    Screen.updateVideoIndex(VideoManager.index+1)
    Screen.changeVideo(video)
    
    currentThumbnailIndex--
    currentThumbnailSerial = document.querySelector(`.video-item[data-video="${currentThumbnailIndex}"]`).dataset.index
    getSaveData()
})

document.querySelector('.next-btn').addEventListener('click', ()=> {
    const video = VideoManager.getNextVideo()
    
    Screen.updateVideoIndex(VideoManager.index+1)
    Screen.changeVideo(video)
    
    currentThumbnailIndex++
    currentThumbnailSerial = document.querySelector(`.video-item[data-video="${currentThumbnailIndex}"]`).dataset.index
    getSaveData()
})

document.querySelector('.video-list').addEventListener('click', (e)=> {
    const {target} = e
    const video = target.classList.contains('video-item') ?
    target : video.closest('.video-item')

    if(video) {
        const index = video.dataset.video
        currentThumbnailIndex = index
        currentThumbnailSerial = video.dataset.serial

        Screen.changeVideo(VideoManager.getTargetVideo(index))
        getSaveData()
   }
})

document.querySelector('#sawBar').addEventListener('drag', (e)=> {
    sawBarFunc(e)
})

document.querySelector('#sawBar').addEventListener('dragend', (e)=> {
    sawBarFunc(e)
})

document.querySelector('.video').addEventListener('mousedown', (e)=> {
    if(e.target.className == 'sawBar') return
    sawBarFunc(e)
})

function sawBarFunc(e) {
    const timeOffset = e.clientX > 1280 ? 1280 : e.clientX

    const percent = (timeOffset / 1280) * 100
    VideoManager.dragThumbnailTime(percent)

    document.querySelector('#sawBar').style.left = timeOffset + "px"

    // const time = (VideoManager.videoDuration * percent) / 100
    // Screen.updateVideoTime(time)
}

