import './index.css'
import { formAdd, formEdit, nameInput, aboutInput, profileName, profileAbout, profileEditButton, cardsAddButton, avatarEditButton, profileAvatar, formAvatar, myProfile, validateSettings } from './components/constants.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import { api } from './components/Api.js';
import { checkError } from './components/utils';
import Section from './components/Section.js';
import PopuWithForm from './components/PopupWIthForm.js';

const formAddValidator = new FormValidator(validateSettings, formAdd);
const formEditValidator = new FormValidator(validateSettings, formEdit);
const formAvatarValidator = new FormValidator(validateSettings, formAvatar);

const popupWithFormEdit = new PopuWithForm({
  selector: '.popup-edit',
  submitForm: (obj) => {
    return api.setProfileAbout(obj.name, obj.about)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileAbout.textContent = userData.about;
      })      
      .catch(checkError)
      .finally(() => {
        popupWithFormEdit.close();
      })
  }
})

popupWithFormEdit.setEventListeners();

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupWithFormEdit.open();
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;
})

const popupWIthAvatarChange = new PopuWithForm({
  selector: '.popup-avatar',
  submitForm: (obj) => {
    return api.changeAvatar(obj.link)
    .then((userData) => {
      profileAvatar.src = userData.avatar;
    })
    .catch(checkError)
    .finally(() => {
      popupWIthAvatarChange.close();
    })
  }
})

popupWIthAvatarChange.setEventListeners();


// Обработчик кнопки смены аватара
avatarEditButton.addEventListener('click', () => {
  popupWIthAvatarChange.open();
});


const popupWithFormAdd = new PopuWithForm({
  selector:'.popup-add', 
  submitForm: (obj) => {
   return api.addCardRequest(obj.title, obj.link)
    .then((data) => {
      const addCard = new Section({
        items: [data],
        renderer: (item) => {
          console.log(item)
          const card = new Card(item, '#card-template')
          const cardElement = card.createCard();
          console.log(cardElement)
          addCard.addItem(cardElement);
       }}, '.gallery');
      addCard.rendererItems();
    })
    .finally(() => {
      popupWithFormAdd.close();
    })
}})

popupWithFormAdd.setEventListeners();

  // Обработчик кнопки добавления карточек
cardsAddButton.addEventListener('click', () => {
  popupWithFormAdd.open();
})

// Вызов функции валидации форм
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();


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
    addCard.rendererItems();
  });