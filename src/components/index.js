import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('#title');
const profileSubtitleInput = document.querySelector('#subtitle');
const cardsList = document.querySelector('.elements');
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
const formValidators = {};

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

const userProfile = new UserInfo(profileTitle, profileSubtitle);

const userProfilePopup = new PopupWithForm('.popup_type_profile', () => {
  userProfile.setUserInfo(profileTitleInput, profileSubtitleInput);
  userProfilePopup.close()
});
userProfilePopup.setEventListeners();

editProfileBtn.addEventListener('click', () => {
  const userData = userProfile.getUserInfo()
  profileTitleInput.value = userData.name
  profileSubtitleInput.value = userData.info
  userProfilePopup.open()
  formValidators['edit-profile'].resetValidation()
})

const addPlacePopup = new PopupWithForm('.popup_add_card', (data) => {
    const card = createCard(data);
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
    addPlacePopup.close()
})

addPlaceBtn.addEventListener('click', () => {
  addPlacePopup.open()
  formValidators['add-place'].resetValidation()
})


const viewImagePopup = new PopupWithImage('.popup_view_image');
viewImagePopup.setEventListeners()

function createCard(data) {
  const card = new Card({data: data, handleImageClick: (link, name) => {
    viewImagePopup.open(link, name);
  }}, '#template');
  return card;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
}, '.elements'
);
cardList.renderItems();