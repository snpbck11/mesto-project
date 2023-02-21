import './index.css';

import {popupAdd, popupEdit, popupPicture, formAdd, formEdit, nameInput, aboutInput, pictureNameInput, linkInput, profileName, profileAbout, profileEditButton, cardsAddButton, gallery} from './components/utils.js';
import {enableValidation} from './components/validate.js';
import {createCard, addCard, setLike, removeCard, initialCards} from './components/cards.js';
import {closePopup, popupHandler, showCards} from './components/modals.js'

// Вызов функции попапа с формой редактирования профиля
popupHandler(profileEditButton, popupEdit, () => {
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;
});

// Вызов функции попапа с формой добавления карточек
popupHandler(cardsAddButton, popupAdd, () => {
  formAdd.reset();
});

// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
const editFormSubmit = (evt) => {
    evt.preventDefault();  
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
};

// Cабмит формы редактирования
formEdit.addEventListener('submit', editFormSubmit);

// Функция заполнения галереи карточками из массива
const addCardsArray = (array) => {
  array.reverse().forEach(element => {
    const item = createCard(element.name, element.link);
    
    addCard(item, gallery);
  });
};

// Обработчик формы добавления карточек
const addFormSubmit = (evt) => {
  evt.preventDefault();
  const card = createCard(pictureNameInput.value, linkInput.value);

  addCard(card, gallery);
  evt.target.querySelector('.form__button').classList.add('form__button_disabled');
  showCards(popupPicture);
  setLike();
  removeCard();
  closePopup(popupAdd);
};

// Cабмит формы добавления карточек
formAdd.addEventListener('submit', addFormSubmit);
// Вызов функции добавления карточек из массива
addCardsArray(initialCards);
// Вызов функции просмотра карточек
showCards(popupPicture)
// Лайки
setLike();
// Удаление карточек
removeCard();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}); 