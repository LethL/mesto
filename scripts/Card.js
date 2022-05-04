export default class Card {
    constructor(data, cardSelector, {handleImageClick}) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
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
        
        this._elementImage = this._element.querySelector('.element__image');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');

        this._element.querySelector('.element__info').querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        this._setEventListeners();

        return this._element;
    } 

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._toggleLike();
        });
        this._elementDelete.addEventListener('click', () => {
            this._deleteCard();
        });
        this._elementImage.addEventListener('click', () => {
            this._handleImageClick(this._link, this._name);
        });
    }

    _toggleLike() {
        this._elementLike.classList.toggle('like_active');
    }

    _deleteCard() {
        this._element.remove()
    }
}