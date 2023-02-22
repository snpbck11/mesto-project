// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
};

// Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

//  Закрытие попапа нажатием на Esc
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
   const popupOpened = document.querySelector('.popup_opened');
   closePopup(popupOpened);
  }
}

const handlePopup = (popup, callback) => {
  openPopup(popup);

  if (callback) {
    callback();
  }

  const popups = document.querySelectorAll('.popup');
  
  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }

      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  });
};

export {closePopup, handlePopup}