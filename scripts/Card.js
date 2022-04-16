export class Card {
    constructor(data, cardSelector, handleOpenPopup) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleOpenPopup = handleOpenPopup;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate(); 
        this._setEventListeners();

        this._element.querySelector('.element__info').querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
      
        return this._element;
    } 

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._toggleLike();
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image').addEventListener("click", () => {
            this._handleOpenPopup(this._name, this._link);
        });
    }

    _toggleLike() {
        this._element.querySelector('.element__like').classList.toggle('like_active');
    }

    _deleteCard() {
        this._element.remove()
    }
}