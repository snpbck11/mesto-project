import { openPopup } from "./modals.js";
import { caption, picture, popupPicture } from "./constants.js";

// Функция создания, удаления и просмотра карточек
const createCard = (titleValue, photoValue) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardPhoto.src = photoValue;
  cardPhoto.alt = titleValue;

  // Лайки
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active')
  })

  // Удаление
  cardElement.querySelector('.card__trash-button').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  })

  // Открытие попапа с картинкой
  cardPhoto.addEventListener('click', () => {
    openPopup(popupPicture)
    picture.src = cardPhoto.src;
    picture.alt = cardPhoto.alt;
    caption.textContent = cardPhoto.alt;
  })
  
  return cardElement;
};

// Функция добавления карточки
const addCard = (card, container) => {
  container.prepend(card);
};

// Функция заполнения галереи карточками из массива
const addCardsArray = (array, container) => {
  array.reverse().forEach(element => {
    const item = createCard(element.name, element.link);
    
    addCard(item, container);
  });
};

export {createCard, addCard, addCardsArray}