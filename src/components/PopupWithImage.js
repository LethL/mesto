import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._popupImg = this._popup.querySelector('.popup__card-img');
        this._popupCaption = this._popup.querySelector('.popup__card-name');
    }

    open(link, name) {
        this._popupImg.src = link;
        this._popupCaption.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}