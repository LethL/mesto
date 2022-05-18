import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._formSubmitBtnText = this._formSubmitBtn.textContent;
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault()
          this._actionHandler()
        })
    }

    actionHandler(submit) {
        this._actionHandler = submit
    }
}