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
  profileAvatar,
  profileAvatarEdit,
} from "../utils/constants.js";
export let userId = '';

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
  })}, '#template', userId);
  return card.generateCard();
}

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  },
}, '.elements'
);

const userProfile = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const userProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  userProfilePopup.loadingHandler(true)
  api.editUserInfo(data)
  .then((value) => {
    userProfile.setUserInfo(value);
    userProfilePopup.close()
  })
  .catch((err) => console.log(err))
  .finally(() => userProfilePopup.loadingHandler(false))
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
  addPlacePopup.loadingHandler(true)
  api.addCard(data)
  .then((value) => {
    const card = createCard(value);
    cardList.addItem(card);
    addPlacePopup.close()
  })
  .catch((err) => console.log(err))
  .finally(() => addPlacePopup.loadingHandler(false))
})

addPlacePopup.setEventListeners();

addPlaceBtn.addEventListener('click', () => {
  addPlacePopup.open()
  formValidators['add-place'].resetValidation()
})


const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', (data) => { 
  editAvatarPopup.loadingHandler(true)
  api.editAvatar(data)
  .then((avatar) => {
    userProfile.setUserAvatar(avatar) 
    editAvatarPopup.close()
  })
  .catch((err) => console.log(err))
  .finally(() => editAvatarPopup.loadingHandler(false))
});
editAvatarPopup.setEventListeners()

profileAvatarEdit.addEventListener('click', () => {
  editAvatarPopup.open()
})

Promise.all( [api.getUserInfo(), api.getInitialCards()] )
.then((data) => {
  userProfile.setUserInfo(data[0])
  userId = data[0]._id;

  cardList.renderItems(data[1]);
})
.catch((err) => console.log(err))