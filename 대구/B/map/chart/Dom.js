export default class Dom {
    constructor(document) {
        this.document = document
    }

    dom(d) {
        return $(this.document.querySelector(d))
    }

    domAll(d) {
        return $(this.document.querySelectorAll(d))
    }

}