import './index.css'
import {popups, popupAdd, popupEdit, formAdd, formEdit, nameInput, aboutInput, pictureNameInput, linkInput, profileName, profileAbout, profileEditButton, cardsAddButton, gallery, avatarEditButton, popupAvatar, profileAvatar, avatarLink, formAvatar, myProfile, validateConfig, validateSettings} from './components/constants.js';
import {enableValidation} from './components/validate.js';
import {createCard, addCard, addCardsArray} from './components/cards.js';
import {closePopup, openPopup} from './components/modals.js'
import { addCardRequest, changeAvatar, setProfileAbout, getProfileAbout, getProfileCards } from './components/api.js';
import { handleSubmit} from './components/utils';

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
  openPopup(popupAdd);
})

// Обработчик кнопки смены аватара
avatarEditButton.addEventListener('click', () => {
  openPopup(popupAvatar)
})

// Обработчик отправки формы смены аватара
const handleProfileAvatarChange = (evt) => {
  function makeRequest() {
    return changeAvatar(avatarLink.value)
      .then((userData) => {
        profileAvatar.src = userData.avatar;
      })
  }
  handleSubmit(makeRequest, evt, popupAvatar)
}

// Сабмит формы обновления аватара
formAvatar.addEventListener('submit', handleProfileAvatarChange);

// Обработчик «отправки» формы редактирования
const handleProfileFormSubmit = (evt) => {
  function makeRequest() {
    return setProfileAbout(nameInput.value, aboutInput.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileAbout.textContent = userData.about;
      })
  }
  handleSubmit(makeRequest, evt, popupEdit);
}

// Cабмит формы редактирования
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы добавления карточек
const handleCardFormSubmit = (evt) => {
  function makeRequest() {
    return addCardRequest(pictureNameInput.value, linkInput.value)
      .then((cardData) => {
        addCard(createCard(cardData), gallery);
      })
  }
  handleSubmit(makeRequest, evt, popupAdd);
}

// Cабмит формы добавления карточек
formAdd.addEventListener('submit', handleCardFormSubmit);

// Вызов функции валидации форм
enableValidation(validateSettings);

Promise.all([getProfileAbout(), getProfileCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    myProfile.id = userData._id;
    myProfile.name = userData.name;
    addCardsArray(cards, gallery)
  }); 