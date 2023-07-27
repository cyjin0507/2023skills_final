class Review {
    constructor() {
        this.init()
    }

    async init() {
        const {data} = await $.getJSON('/resources/json/place.json')
        this.data = data.filter(x=> x.idx==this.param)
        console.log(this.data);
    }

    get param() {
        const url = new URL(window.location.href)
        const urlParams = url.searchParams
        return urlParams.get('idx')
    }

}

new Review()