const escKey = 27;

export default class Popup {
    constructor(containerSelector) {
        this._popup = document.querySelector(containerSelector)
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeBtn = this._popup.querySelector('.popup__close-image');
    }

    _handleEscClose(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode === escKey) {
            this.close()
        }
    }

    open() {
        this._popup.classList.add('popup_opened')
        this.setEventListeners()
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target === this._closeBtn) {
                this.close()
            }
        })
    }
}