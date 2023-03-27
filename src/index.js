import './index.css'
import { popups, popupAdd, popupEdit, formAdd, formEdit, nameInput, aboutInput, pictureNameInput, linkInput, profileName, profileAbout, profileEditButton, cardsAddButton, gallery, avatarEditButton, popupAvatar, profileAvatar, avatarLink, formAvatar, myProfile, validateSettings } from './components/constants.js';
import { enableValidation } from './components/validate.js';
import Card from './components/Card.js';
import Popup from './components/Popup.js'
import { api } from './components/Api.js';
import { handleSubmit} from './components/utils';
import Section from './components/Section.js';


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
    return api.addCardRequest(pictureNameInput.value, linkInput.value)
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

Promise.all([api.getProfileAbout(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    myProfile.id = userData._id;
    myProfile.name = userData.name;
    const addCard = new Section({
      items: cards, 
      renderer: (data) => {
        const card = new Card(data, '#card-template')
        const cardElement = card.createCard()
        addCard.addItem(cardElement)
      } 
    }, '.gallery')
    addCard.rendereritems()
  });