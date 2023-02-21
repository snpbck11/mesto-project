// Функция создания, удаления и просмотра карточек
const createCard = (titleValue, photoValue) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__photo').src = photoValue;
  cardElement.querySelector('.card__photo').alt = titleValue;

  return cardElement;
};

// Функция добавления карточки
const addCard = (card, container, popup) => {
  container.prepend(card);
};

// Лайки
const setLike = () => {
  const likes = document.querySelectorAll('.card__like-button')
  likes.forEach(like => {
    like.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active')
    })
  })
}

// Удаление карточки
const removeCard = () => {
  const trashButtons =  document.querySelectorAll('.card__trash-button');
  trashButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
      evt.target.parentElement.remove();
    })
  });
}

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

export {createCard, addCard, setLike, removeCard, initialCards}
