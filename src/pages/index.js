import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
} from "../utils/constants.js";

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

const userProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  userProfile.setUserInfo(data);
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


const viewImagePopup = new PopupWithImage('.popup_view_image');
viewImagePopup.setEventListeners()

function createCard(data) {
  const card = new Card({data: data, handleImageClick: (link, name) => {
    viewImagePopup.open(link, name);
  }}, '#template');
  return card;
}

const addPlacePopup = new PopupWithForm('.popup_add_card', (data) => {
  const card = createCard(data);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  addPlacePopup.close()
})
addPlacePopup.setEventListeners();

addPlaceBtn.addEventListener('click', () => {
addPlacePopup.open()
formValidators['add-place'].resetValidation()
})

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/cards',
  headers: {
    authorization: '34ba8aa0-fdc8-4f70-8c18-1ea7527a281e'
  }
})

const initialCards = api.getInitialCards()
initialCards.then((data) => {
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  }, '.elements'
  );
  cardList.renderItems();
})
.catch(err => console.log(err));
