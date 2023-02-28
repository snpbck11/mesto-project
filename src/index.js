import './index.css'
import {popups, popupAdd, popupEdit, formAdd, formEdit, nameInput, aboutInput, pictureNameInput, linkInput, profileName, profileAbout, profileEditButton, cardsAddButton, gallery, avatarEditButton, popupAvatar, profileAvatar, avatarLink, formAvatar, myProfile, validateConfig} from './components/constants.js';
import {enableValidation} from './components/validate.js';
import {createCard, addCard, addCardsArray} from './components/cards.js';
import {closePopup, openPopup} from './components/modals.js'
import { addCardRequest, changeAvatar, setProfileAbout, getProfileAbout, getProfileCards } from './components/api.js';
import { renderLoading } from './components/utils';

// Закрытие любого попапа по нажатию на крестик или на оверлей
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

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;
})

// Обработчик кнопки добавления карточек
cardsAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
})

// Обработчик кнопки смены аватара
avatarEditButton.addEventListener('click', () => {
  openPopup(popupAvatar, () => {
    avatarLink.value = '';
  })
})

// Обработчик отправки формы смены аватара
const handleProfileAvatarChange = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  changeAvatar(avatarLink.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupAvatar);
      evt.target.reset();
    })
}

// Сабмит формы обновления аватара
formAvatar.addEventListener('submit', handleProfileAvatarChange);

// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  setProfileAbout(nameInput.value, aboutInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
    })
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupEdit);
    })
};

// Cабмит формы редактирования
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы добавления карточек
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  addCardRequest(pictureNameInput.value, linkInput.value)
  .then((card) => {
    addCard(createCard(card), gallery);
  })
  .finally(() => {
    renderLoading(false, evt);
    closePopup(popupAdd);
    evt.target.reset();
  })
};

// Cабмит формы добавления карточек
formAdd.addEventListener('submit', handleCardFormSubmit);

// Вызов функции валидации форм
enableValidation(validateConfig);

const onLoad = () => { 
  new Promise((res, rej) => {
    window.onload = res;
    window.onerror = rej;
  })
    .then(() => {
      return getProfileAbout()
      .then((profile) => {
        profileName.textContent = profile.name;
        profileAbout.textContent = profile.about;
        profileAvatar.src = profile.avatar;
        myProfile.id = profile._id;
        myProfile.name = profile.name
      });
    })
    .then(() => {
      getProfileCards()
      .then((cards) => {
        addCardsArray(cards, gallery);
      })
    })
    .catch((rej) => {
      console.log(rej)
    })
}

onLoad(); 