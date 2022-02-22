let popupOpenBtn = document.querySelector('.profile__edit-button')
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitleInput = document.querySelector('#title');
let profileSubtitleInput = document.querySelector('#subtitle');
let form = document.querySelector('.popup__form');

function closeForm() {
    popup.classList.remove('popup_opened');
}

function openForm() {
    popup.classList.add('popup_opened');
}

popupOpenBtn.addEventListener('click', openForm)

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


form.addEventListener('submit', e => {
    e.preventDefault();
    editProfileText();
    closeForm();
})