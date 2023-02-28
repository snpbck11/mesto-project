import { openPopup } from "./modals.js";
import { caption, myProfile, picture, popupPicture } from "./constants.js";
import { removeCard, removeLikeRequest, setLikeRequest } from "./api.js";

// Удаление кнопки корзины, если пользователь не загружал её
const hideTrashButton = (owner, button) => {
  if (myProfile.id !== owner) {
   button.remove();
  }
}

// Проверка и установка количества лайков
const checkLikes = (likes, counter) => {
  if (likes.length > 0) {
    counter.classList.add('card__like-counter_active');
    counter.textContent = likes.length;
  } else {
    counter.classList.remove('card__like-counter_active');
    counter.textContent = '';
  }
};

// Проверка на наличие моего лайка
const checkMyLike = (likes, button) => {
  likes.forEach((like) => {
    if (like.name === myProfile.name) {
      button.classList.add('card__like-button_active'); 
    }
  })
};

// Функция создания, удаления и просмотра карточек
const createCard = (card) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardTrashButton = cardElement.querySelector('.card__trash-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');
  const cardLikeButton = cardElement.querySelector('.card__like-button')

  cardElement.querySelector('.card__title').textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  // Лайки
  cardLikeButton.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button_active')) {
      removeLikeRequest(card._id)
        .then((card) => {
          checkLikes(card.likes, cardLikesCounter);
          evt.target.classList.remove('card__like-button_active')
        })
    } else {
      setLikeRequest(card._id)
        .then((card) => {
          checkLikes(card.likes, cardLikesCounter);
          checkMyLike(card.likes, evt.target);
        });
    }
  });

  // Удаление
  cardTrashButton.addEventListener('click', (evt) => {
    removeCard(card._id)
      .then(() => {
        evt.target.closest('.card').remove();
      })
  });

  // Открытие попапа с картинкой
  cardPhoto.addEventListener('click', () => {
    openPopup(popupPicture);
    picture.src = cardPhoto.src;
    picture.alt = cardPhoto.alt;
    caption.textContent = cardPhoto.alt;
  });

  hideTrashButton(card.owner._id, cardTrashButton);

  checkLikes(card.likes, cardLikesCounter);

  checkMyLike(card.likes, cardLikeButton);

  return cardElement;
};

// Функция добавления карточки
const addCard = (card, container) => {
  container.prepend(card);
};

// Функция заполнения галереи карточками из массива
const addCardsArray = (cards, container) => {
  cards.reverse().forEach(card => {
    const item = createCard(card);
    addCard(item, container);
  });
};

export {createCard, addCard, addCardsArray}