export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  close() {
    document.querySelector(this.selector).classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };

  open() {
    document.querySelector(this.selector).classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };


  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
     this.close();
    }
  }

  setEventListeners() {
    document.querySelector(this.selector).addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}