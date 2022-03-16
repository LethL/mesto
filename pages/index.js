const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_add_card');
const popupViewImage = document.querySelector('.popup_view_image');
const closeTypeProfile = document.querySelector('.close_type_profile');
const closeAddCard = document.querySelector('.close_add_card');
const closeViewImage = document.querySelector('.close_view_image');
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

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function openEditProfilePopup() {
    editInputValue();
    openPopup(popupTypeProfile);
}

function openAddPlacePopup() {
  openPopup(popupAddCard);
}

editProfileBtn.addEventListener('click', openEditProfilePopup)
addPlaceBtn.addEventListener('click', openAddPlacePopup)

closeTypeProfile.addEventListener('click', () => {
  closePopup(popupTypeProfile)
})

closeAddCard.addEventListener('click', () => {
  closePopup(popupAddCard)
})

closeViewImage.addEventListener('click', () => {
  closePopup(popupViewImage)
})

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
    card.querySelector('.element__image').alt = name;
    card.querySelector('.element__info').querySelector('.element__title').textContent = name;
    cardButtonsListenners(card);
    cardsList.prepend(card);
    // Здравствуйте! По поводу дополнительной функции с возвратом карточки,
    // я не совсем понял, можете скинуть ссылки на какие-то материалы/вебинары/примеры?
    // Просто как я это воспринимаю, в данной функции(рендер(отрисовка карты)) процесс создания карточки и впоследствии ее добавление един,
    // так же у нас был вебинар по данной теме, где наствник точно таким же способом реализовал данную функцию.
    // И мне не совсем понятно для чего писать дополнительную функцию с последующим ее вызовом в других функциях,
    // когда это можно решить одной строчкой в этой функции. Спасибо за быстрое ревью)
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
    openPopup(popupViewImage);
    cardImg.src = e.target.src
    cardImg.alt = card.querySelector('.element__info').querySelector('.element__title').textContent;
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