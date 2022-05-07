import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, submit) {
        super(containerSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__form-input'));
        this._submit = submit;
    }

    _getInputValues() {
        this._inputValues = {}
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        })
        return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault()
          this._submit(this._getInputValues());
        })
    }

    close() {
        super.close()
        this._formElement.reset()
    }
}