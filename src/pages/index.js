import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  config,
  editProfileBtn,
  addPlaceBtn,
  profileTitle,
  profileSubtitle,
  profileTitleInput,
  profileSubtitleInput,
  cardsList,
  profileAvatar,
} from "../utils/constants.js";
// import { data } from 'autoprefixer';

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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '34ba8aa0-fdc8-4f70-8c18-1ea7527a281e',
    'Content-Type': 'application/json'
  }
})

const viewImagePopup = new PopupWithImage('.popup_view_image');
viewImagePopup.setEventListeners()

const deleteCardPopup = new PopupWithConfirm('.popup_delete_card');
deleteCardPopup.setEventListeners()

function createCard(data) {
  const card = new Card({data: data, handleImageClick: (link, name, likes) => {
    viewImagePopup.open(link, name, likes);
  }, deleteHandler: (() => {
    deleteCardPopup.open()
    deleteCardPopup.actionHandler(() => {
      api.deleteCard(data._id)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err))
    })
  }), likeHandler: (() => {
    api.likeCard(data._id)
    .then(() => {
      card.likeCard();
    })
    .catch((err) => console.log(err))
  }), dislikeHandler: (() => {
    api.dislikeCard(data._id)
    .then(() => {
      card.dislikeCard();
    })
    .catch((err) => console.log(err))
  })}, '#template');
  return card;
}

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
}, '.elements'
);

const initialCards = api.getInitialCards()
initialCards.then((data) => {
  cardList.renderItems(data);
})
.catch(err => console.log(err));

const userProfile = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const getUserInfo = api.getUserInfo()
getUserInfo.then((data) => {
  userProfile.setUserInfo(data)
})

const userProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  api.editUserInfo(data)
  .then((value) => {
    userProfile.setUserInfo(value);
    userProfilePopup.close()
  })
  .catch((err) => console.log(err))
});
userProfilePopup.setEventListeners();

editProfileBtn.addEventListener('click', () => {
  const data = userProfile.getUserInfo()
  profileTitleInput.value = data.name
  profileSubtitleInput.value = data.about
  userProfilePopup.open()
  formValidators['edit-profile'].resetValidation()
})

const addPlacePopup = new PopupWithForm('.popup_add_card', (data) => {
  api.addCard(data)
  .then((value) => {
    const card = createCard(value);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPlacePopup.close()
  })
  .catch((err) => console.log(err))
})

addPlacePopup.setEventListeners();

addPlaceBtn.addEventListener('click', () => {
  addPlacePopup.open()
  formValidators['add-place'].resetValidation()
})