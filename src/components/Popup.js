export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  close() {
    document.querySelector(this.selector).classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  open() {
    document.querySelector(this.selector).classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };


  // Не срабатывает this.close()
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
     const popupOpened = document.querySelector('.popup_opened');
     popupOpened.classList.remove('popup_opened')
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