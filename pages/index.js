let editProfileBtn = document.querySelector('.profile__edit-button');
let addPlaceBtn = document.querySelector('.profile__add-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitleInput = document.querySelector('#title');
let profileSubtitleInput = document.querySelector('#subtitle');
let addProfileForm = document.querySelector('#edit-profile-form');
let addPlaceForm = document.querySelector('#add-place-form');
const placeNameInput = document.querySelector('#name-input');
const placeImageInput = document.querySelector('#image-input');
const cardsList = document.querySelector('.elements');
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

function closeForm() {
    popup.classList.remove('popup_opened');
}

function openForm() {
    editInputValue();
    popup.classList.add('popup_opened');
    addPlaceForm.classList.add('popup__form_disabled');
    addProfileForm.classList.remove('popup__form_disabled');
}

function openAddPlaceForm() {
  popup.classList.add('popup_opened');
  addProfileForm.classList.add('popup__form_disabled');
  addPlaceForm.classList.remove('popup__form_disabled');
}

editProfileBtn.addEventListener('click', openForm)
addPlaceBtn.addEventListener('click', openAddPlaceForm)

popupCloseBtn.addEventListener('click', closeForm)

function editInputValue() {
    profileTitleInput.value = profileTitle.innerHTML;
    profileSubtitleInput.value = profileSubtitle.innerHTML;
}
editInputValue()

function editProfileText() {
    profileTitle.innerHTML = profileTitleInput.value;
    profileSubtitle.innerHTML = profileSubtitleInput.value;
}


addProfileForm.addEventListener('submit', e => {
    e.preventDefault();
    editProfileText();
    closeForm();
})

function renderCards(link, name) {
    const cardTemplate = document.querySelector('#template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = link;
    card.querySelector('.element__info').querySelector('.element__title').textContent = name;
    cardButtonsListenners(card);
    cardsList.prepend(card);
}

initialCards.map(card => {
    renderCards(card.link, card.name)
})

addPlaceForm.addEventListener('submit', addPlace)

function addPlace(event) {
  event.preventDefault()
  const link = placeImageInput.value
  const name = placeNameInput.value
  renderCards(link, name)
  placeImageInput.value = ''
  placeNameInput.value = ''
  closeForm()
}

document.querySelectorAll('.element').forEach(e => {
  e.addEventListener('click', elem => {
    if (elem.target.classList.contains('element__like')) {
      elem.target.classList.toggle('like_active')
    }
  })
})

function deleteCard(event) {
  const card = event.currentTarget.closest('.element')
  card.remove()
}

function cardButtonsListenners(card) {
  card.querySelector('.element__delete').addEventListener('click', deleteCard)
}