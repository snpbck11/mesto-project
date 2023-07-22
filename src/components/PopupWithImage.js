import Popup from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor(selector) {
    super(selector);
    this._picture = document.querySelector(".popup-picture__image");
    this._figCaption = document.querySelector(".popup-picture__caption");
  }

  open(photo) {
    this._picture.src = photo.link;
    this._picture.alt = photo.name;
    this._figCaption.textContent = photo.name;
    super.open();
  }
}
