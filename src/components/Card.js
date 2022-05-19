export default class Card {
    constructor({data, handleImageClick, deleteHandler, likeHandler, dislikeHandler}, cardSelector, userId) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._likesCount = this._likes.length;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._deleteHandler = deleteHandler;
        this._likeHandler = likeHandler;
        this._dislikeHandler = dislikeHandler;
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
        if (this._ownerId !== this._userId) {
            this._elementDelete.remove();
        }
        if (this._likes.find((id) => id._id === this._userId)) {
            this._elementLike.classList.add('like_active');
        }

        this._setEventListeners();

        return this._element;
    } 

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            if (!(this._elementLike.classList.contains('like_active'))) {
                this._likeHandler();
            } else {
                this._dislikeHandler();
            }
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

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    likeCard() {
        this._elementLike.classList.add('like_active');
        this._likesCount++;
        this._elementLikeCount.textContent = this._likesCount;
    }

    dislikeCard() {
        this._elementLike.classList.remove('like_active');
        this._likesCount--;
        this._elementLikeCount.textContent = this._likesCount;
    }
}