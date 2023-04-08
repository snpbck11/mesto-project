
export default class Card {
  constructor({data, myProfileId, handleLike, handleRemoveCard, handleClick}, selector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._userId = myProfileId;
    this._selector = selector;
    this._handleLike = handleLike;
    this._handleRemoveCard = handleRemoveCard;
    this._handleClick = handleClick;
  }

  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  // Удаление кнопки корзины, если пользователь не загружал её
  _hideTrashButton () {
    if (this._userId !== this._owner) {
      this._cardTrashButton.remove();
    }
  };

  // Проверка и установка количества лайков
  checkLikes = (likes) => {
    if (likes.length > 0) {
      this._cardLikesCounter.classList.add("card__like-counter_active");
      this._cardLikesCounter.textContent = likes.length;
    } else {
      this._cardLikesCounter.classList.remove("card__like-counter_active");
      this._cardLikesCounter.textContent = "";
    }
  };

  // Проверка на наличие моего лайка
  checkMyLike () {
   return this._likes.some(like => like._id === this._userId);
  }

  // Поставить лайк
  setLike() {
    this._cardLikeButton.classList.add('card__like-button_active');
  }

  // Убрать лайк
  removeLike() {
    this._cardLikeButton.classList.remove('card__like-button_active');
  }

  removeCard() {
    this._element.remove()
  }

  _setEventsListeners() {
    // Лайки
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLike();
    });
    // Удаление
    this._cardTrashButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });

    // Открытие попапа с картинкой
    this._cardPhoto.addEventListener("click", () => {
      this._handleClick();
    });
  }

  createCard() {
    this._element = this._getElement();
    this._cardPhoto = this._element.querySelector(".card__photo");
    this._cardTrashButton = this._element.querySelector(".card__trash-button");
    this._cardLikesCounter = this._element.querySelector(".card__like-counter");
    this._cardLikeButton = this._element.querySelector(".card__like-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    this._setEventsListeners();

    this._hideTrashButton();

    this.checkLikes(this._likes);

    if (this.checkMyLike()) {
      this.setLike();
    };

    return this._element;
  }
}
