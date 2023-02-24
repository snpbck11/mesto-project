// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
};

// Функция открытия попапа
const openPopup = (popup, callaback) => {
  if (callaback) {
    callaback();
  }

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

export {closePopup, openPopup}