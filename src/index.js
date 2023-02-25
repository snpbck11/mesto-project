import './index.css'
import {popups, popupAdd, popupEdit, formAdd, formEdit, nameInput, aboutInput, pictureNameInput, linkInput, profileName, profileAbout, profileEditButton, cardsAddButton, gallery, initialCards, avatarEditButton, popupAvatar, profileAvatar, avatarLink, formAvatar} from './components/constants.js';
import {enableValidation} from './components/validate.js';
import {createCard, addCard, addCardsArray} from './components/cards.js';
import {closePopup, openPopup} from './components/modals.js'
// Закрытие любого попапа по нажатию на крестик или на оверлей
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }

    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;
})

// Обработчик кнопки добавления карточек
cardsAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
})

// Обработчик кнопки смены аватара
avatarEditButton.addEventListener('click', () => {
  openPopup(popupAvatar, () => {
    avatarLink.value = '';
  })
})

// Обработчик отправки формы смены аватара
const handleProfileAvatarChange = (evt) => {
  evt.preventDefault();
  profileAvatar.src = avatarLink.value;
  closePopup(popupAvatar);
  evt.target.reset();
}

formAvatar.addEventListener('submit', handleProfileAvatarChange);

// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();  
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
};

// Cабмит формы редактирования
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы добавления карточек
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const card = createCard(pictureNameInput.value, linkInput.value);

  addCard(card, gallery);
  closePopup(popupAdd);
  evt.target.reset();
};

// Cабмит формы добавления карточек
formAdd.addEventListener('submit', handleCardFormSubmit);

// Вызов функции добавления карточек из массива
addCardsArray(initialCards, gallery);

// Вызов функции валидации форм
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}); 