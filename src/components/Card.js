export default class Card {
    constructor({data, handleImageClick, deleteHandler}, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data.owner._id;
        this._userId = 'ff7d1dd1e4b8348a3ef22f47';
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._deleteHandler = deleteHandler;
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
        this._elementLikeCount = this._element.querySelector('.element__like-count');

        this._element.querySelector('.element__info').querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementLikeCount.textContent = this._likes.length;
        if (this._id !== this._userId) {
            this._elementDelete.remove();
        }

        this._setEventListeners();

        return this._element;
    } 

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._toggleLike();
        });
        this._elementDelete.addEventListener('click', () => {
            this._deleteHandler();
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