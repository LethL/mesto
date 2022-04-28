import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_add_card');
const popupViewImage = document.querySelector('.popup_view_image');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('#title');
const profileSubtitleInput = document.querySelector('#subtitle');
const addProfileForm = document.querySelector('#edit-profile-form');
const addPlaceForm = document.querySelector('#add-place-form');
const placeNameInput = document.querySelector('#name-input');
const placeImageInput = document.querySelector('#image-input');
const cardsList = document.querySelector('.elements');
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-image')) {
        closePopup(popup)
      }
  })
})

function handleEscUp(evt) {
  if (evt.keyCode === escKey) {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp)
  popup.classList.add('popup_opened')
}

function editInputValue() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

const formValidators = {}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);


function openEditProfilePopup() {
  editInputValue()
  formValidators['edit-profile'].resetValidation()
  openPopup(popupTypeProfile)
}

function openAddPlacePopup() {
  openPopup(popupAddCard)
  formValidators['add-place'].resetValidation()
}

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

function handleImageClick(name, link) {
  cardImg.src = link;
  cardImg.alt = name;
  cardName.textContent = name;
  openPopup(popupViewImage)
}

function createCard(item) {
  const card = new Card(item, '#template', handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  },
}, '.elements'
); 
cardList.renderItems();


function addCard(event) {
  event.preventDefault();
  const link = placeImageInput.value;
  const name = placeNameInput.value;
  const cardElement = createCard({link, name});
  cardsList.prepend(cardElement);
  closePopup(popupAddCard)
  placeImageInput.value = ''
  placeNameInput.value = ''
}

addPlaceForm.addEventListener('submit', addCard);