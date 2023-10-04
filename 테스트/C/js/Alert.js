async function alertInit() {
    const alertData = await $.getJSON('/alert/get')
    if(alertData.length > 0) {
        alertDraw(alertData)
    }
}

function alertDraw(data) {
    
}

function timeCalc(value) {
    const today = new Date()
    const date = new Date(value)

    const betweenTime = Math.floor((today.getTime() - date.getTime()) / 1000 / 60)

    if(betweenTime == 0) {
        return '0분전'
    } else if(betweenTime < 60) {
        return `${betweenTime}분전`
    }

    const betweenDay = Math.floor(betweenTime / 60)
    if(betweenDay < 24) {
        return `${betweenDay}시간전`
    }

    return value.substr(0,10)
}
