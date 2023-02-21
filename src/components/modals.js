// Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const closePopupKeyDown = (popup) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  })
}

// Функция открытия и закрытия попапов, так же закрытие при нажатии на оверлей, если таков имеется.
const popupHandler = (trigger, popup, callback) => {
  trigger.addEventListener('click', () => {
    openPopup(popup);
    callback();
  });
  
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', () => closePopup(popup));

  closePopupKeyDown(popup);  

  if (popup.className.includes('overlay')) {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      };
    });
  };
};

// Просмотр карточек
const showCards = (popup) => {
  const photos = document.querySelectorAll('.card__photo');
  photos.forEach(photo => {
    popupHandler(photo, popup, () => {
      popup.querySelector('.popup-picture__image').src = photo.src;
      popup.querySelector('.popup-picture__image').alt = photo.alt;
      popup.querySelector('.popup-picture__caption').textContent = photo.alt;
    })
  })
}

export {openPopup, closePopup, closePopupKeyDown, popupHandler, showCards}