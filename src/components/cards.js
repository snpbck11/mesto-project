import { openPopup } from "./modals.js";
import { caption, myProfile, picture, popupPicture } from "./constants.js";
import { api } from "./api.js";
import { checkError } from "./utils.js";

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._selector = selector;
    
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

 
// Удаление кнопки корзины, если пользователь не загружал её
_hideTrashButton = (owner, button) => {
  if (myProfile.id !== owner) {
   button.remove();
  }
}

// Проверка и установка количества лайков
_checkLikes = (likes, counter) => {
  if (likes.length > 0) {
    counter.classList.add('card__like-counter_active');
    counter.textContent = likes.length;
  } else {
    counter.classList.remove('card__like-counter_active');
    counter.textContent = '';
  }
};

// Проверка на наличие моего лайка
_checkMyLike = (likes, button) => {
  likes.forEach((like) => {
    if (like.name === myProfile.name) {
      button.classList.add('card__like-button_active'); 
    }
  })
};

_setEventsListeners() {
    // Лайки
    this._cardLikeButton.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__like-button_active')) {
        api.removeLikeRequest(this._id)
          .then((card) => {
            this._checkLikes(card.likes, this._cardLikesCounter);
            evt.target.classList.remove('card__like-button_active')
          })
          .catch(checkError);
      } else {
        api.setLikeRequest(this._id)
          .then((card) => {
            this._checkLikes(card.likes, this._cardLikesCounter);
            evt.target.classList.add('card__like-button_active')
          })
          .catch(checkError);
      }

        // Удаление
  this._cardTrashButton.addEventListener('click', (evt) => {
    api.removeCard(this._id)
      .then(() => {
        evt.target.closest('.card').remove();
      })
      .catch(checkError);
  });
    });


//      // Открытие попапа с картинкой
//  this._cardPhoto.addEventListener('click', () => {
//    openPopup(popupPicture);
//    picture.src = cardPhoto.src;
//    picture.alt = cardPhoto.alt;
//    caption.textContent = cardPhoto.alt;
//  });
}


createCard() {
  this._element = this._getElement();
  this._cardPhoto = this._element.querySelector('.card__photo');
  this._cardTrashButton = this._element.querySelector('.card__trash-button');
  this._cardLikesCounter = this._element.querySelector('.card__like-counter');
  this._cardLikeButton = this._element.querySelector('.card__like-button');

  this._element.querySelector('.card__title').textContent = this._name;
  this._cardPhoto.src = this._link;
  this._cardPhoto.alt = this._name;

  this._setEventsListeners();

  this._hideTrashButton(this._owner, this._cardTrashButton);

  this._checkLikes(this._likes, this._cardLikesCounter);

  this._checkMyLike(this._likes, this._cardLikeButton);

  return this._element;

}

}


// // Удаление кнопки корзины, если пользователь не загружал её
// const hideTrashButton = (owner, button) => {
//   if (myProfile.id !== owner) {
//    button.remove();
//   }
// }

// // Проверка и установка количества лайков
// const checkLikes = (likes, counter) => {
//   if (likes.length > 0) {
//     counter.classList.add('card__like-counter_active');
//     counter.textContent = likes.length;
//   } else {
//     counter.classList.remove('card__like-counter_active');
//     counter.textContent = '';
//   }
// };

// // Проверка на наличие моего лайка
// const checkMyLike = (likes, button) => {
//   likes.forEach((like) => {
//     if (like.name === myProfile.name) {
//       button.classList.add('card__like-button_active'); 
//     }
//   })
// };

// // Функция создания, удаления и просмотра карточек
// const createCard = (card) => {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardPhoto = cardElement.querySelector('.card__photo');
//   const cardTrashButton = cardElement.querySelector('.card__trash-button');
//   const cardLikesCounter = cardElement.querySelector('.card__like-counter');
//   const cardLikeButton = cardElement.querySelector('.card__like-button')

//   cardElement.querySelector('.card__title').textContent = card.name;
//   cardPhoto.src = card.link;
//   cardPhoto.alt = card.name;

//   // Лайки
//   cardLikeButton.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('card__like-button_active')) {
//       api.removeLikeRequest(card._id)
//         .then((card) => {
//           checkLikes(card.likes, cardLikesCounter);
//           evt.target.classList.remove('card__like-button_active')
//         })
//         .catch(checkError);
//     } else {
//       api.setLikeRequest(card._id)
//         .then((card) => {
//           checkLikes(card.likes, cardLikesCounter);
//           evt.target.classList.add('card__like-button_active')
//         })
//         .catch(checkError);
//     }
//   });

//   // Удаление
//   cardTrashButton.addEventListener('click', (evt) => {
//     api.removeCard(card._id)
//       .then(() => {
//         evt.target.closest('.card').remove();
//       })
//       .catch(checkError);
//   });

//   // Открытие попапа с картинкой
//   cardPhoto.addEventListener('click', () => {
//     openPopup(popupPicture);
//     picture.src = cardPhoto.src;
//     picture.alt = cardPhoto.alt;
//     caption.textContent = cardPhoto.alt;
//   });

//   hideTrashButton(card.owner._id, cardTrashButton);

//   checkLikes(card.likes, cardLikesCounter);

//   checkMyLike(card.likes, cardLikeButton);

//   return cardElement;
// };

// // Функция добавления карточки
// const addCard = (card, container) => {
//   container.prepend(card);
// };

// // Функция заполнения галереи карточками из массива
// const addCardsArray = (cards, container) => {
//   cards.reverse().forEach(card => {
//     const item = createCard(card);
//     addCard(item, container);
//   });
// };

// export {createCard, addCard, addCardsArray}