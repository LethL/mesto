const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
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

function closePopup() {
    popup.classList.remove('popup_opened');
    addProfileForm.classList.remove('popup__form_active');
    addPlaceForm.classList.remove('popup__form_active');
    popupCardContent.classList.remove('popup__card-content_active');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function openEditProfilePopup() {
    editInputValue();
    openPopup(popup);
    addProfileForm.classList.add('popup__form_active');
}

function openAddPlacePopup() {
  openPopup(popup);
  addPlaceForm.classList.add('popup__form_active');
}

editProfileBtn.addEventListener('click', openEditProfilePopup)
addPlaceBtn.addEventListener('click', openAddPlacePopup)

popupCloseBtn.addEventListener('click', closePopup)

function editInputValue() {
    profileTitleInput.value = profileTitle.textContent;
    profileSubtitleInput.value = profileSubtitle.textContent;
}

function editProfileText() {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
}


addProfileForm.addEventListener('submit', e => {
    e.preventDefault();
    editProfileText();
    closePopup();
})

function renderCards(link, name) {
    const cardTemplate = document.querySelector('#template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = link;
    card.querySelector('.element__info').querySelector('.element__title').textContent = name;
    cardButtonsListenners(card);
    addCard(card);
}

function addCard(card) {
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
  closePopup()
}

function deleteCard(event) {
  const card = event.currentTarget.closest('.element')
  card.remove()
}

function cardButtonsListenners(card) {
  card.querySelector('.element__delete').addEventListener('click', deleteCard)
  card.querySelector('.element__like').addEventListener('click', elem => {
    elem.target.classList.toggle('like_active')
  })
  card.querySelector('.element__image').addEventListener('click', e => {
    openPopup(popup);
    popupCardContent.classList.add('popup__card-content_active');
    cardImg.src = e.target.src
    cardImg.alt = card.querySelector('.element__info').querySelector('.element__title').textContent
    cardName.textContent = cardImg.alt
  })
}

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