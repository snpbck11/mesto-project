
import Popup from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor(selector, photo) {
    super(selector);
    this.photo = photo;
  }

  open() {
    const picture = document.querySelector('.popup-picture__image');
    picture.src = this.photo.src;
    picture.alt = this.photo.alt;
    document.querySelector('.popup-picture__caption').textContent = this.photo.alt;
    super.open();
  }
}

//      // Открытие попапа с картинкой
//  this._cardPhoto.addEventListener('click', () => {
//    openPopup(popupPicture);
//    picture.src = cardPhoto.src;
//    picture.alt = cardPhoto.alt;
//    caption.textContent = cardPhoto.alt;
//  });