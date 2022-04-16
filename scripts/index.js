import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_add_card');
const popupViewImage = document.querySelector('.popup_view_image');
const closeTypeProfile = document.querySelector('#close-profile');
const closeAddCard = document.querySelector('#close-card');
const closeViewImage = document.querySelector('#close-image');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('#title');
const profileSubtitleInput = document.querySelector('#subtitle');
const addProfileForm = document.querySelector('#edit-profile-form');
const addPlaceForm = document.querySelector('#add-place-form');
const placeNameInput = document.querySelector('#name-input');
const placeImageInput = document.querySelector('#image-input');
const cardsList = document.querySelector('.elements');
const popupCardContent = document.querySelector('.popup__card-content');
const cardImg = document.querySelector('.popup__card-img');
const cardName = document.querySelector('.popup__card-name');
const escKey = 27;
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-input-error_active'
}
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscUp)
}

function closePopupOnOverlay(popup) {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
}

function handleEscUp(evt) {
  const activePopup = document.querySelector('.popup_opened')
  if (evt.keyCode === escKey) {
    closePopup(activePopup)
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp)
  popup.classList.add('popup_opened')
  closePopupOnOverlay(popup)
}

function editInputValue() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

const profileEditFormValidator = new FormValidator(config, addProfileForm)
profileEditFormValidator.enableValidation()

const placeEditFormValidator = new FormValidator(config, addPlaceForm)
placeEditFormValidator.enableValidation()


function openEditProfilePopup() {
  editInputValue()
  profileEditFormValidator.resetValidation()
  openPopup(popupTypeProfile)
}

function openAddPlacePopup() {
  openPopup(popupAddCard)
  placeEditFormValidator.resetValidation()
}

closeTypeProfile.addEventListener('click', () => {
  closePopup(popupTypeProfile)
})

closeAddCard.addEventListener('click', () => {
  closePopup(popupAddCard)
})

closeViewImage.addEventListener('click', () => {
  closePopup(popupViewImage)
})

function editProfileText() {
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
}

editProfileBtn.addEventListener('click', openEditProfilePopup)

addPlaceBtn.addEventListener('click', openAddPlacePopup)

addProfileForm.addEventListener('submit', e => {
    e.preventDefault();
    editProfileText();
    closePopup(popupTypeProfile);
})

initialCards.forEach((item) => {
  const card = new Card(item, '#template');
  const cardElement = card.generateCard();

  cardsList.append(cardElement);
});

function addCard(event) {
  event.preventDefault()
  const link = placeImageInput.value
  const name = placeNameInput.value
  const newCard = new Card({name, link}, '#template');
  const cardElement = newCard.generateCard();
  cardsList.prepend(cardElement);
  closePopup(popupAddCard)
  placeImageInput.value = ''
  placeNameInput.value = ''
}

addPlaceForm.addEventListener('submit', addCard)
 
addPlaceForm.addEventListener('submit', addCard)

document.addEventListener('animationstart', function (e) {
  if (e.animationName === 'fade-in') {
      e.target.classList.add('popup-fade-in');
  }
});

document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fade-out') {
      e.target.classList.remove('popup-fade-in');
   }
});