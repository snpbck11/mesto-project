import './index.css';
import {
  formAdd,
  formEdit,
  nameInput,
  aboutInput,
  profileName,
  profileAbout,
  profileEditButton,
  cardsAddButton,
  avatarEditButton,
  profileAvatar,
  formAvatar,
  validateSettings,
} from './components/constants.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Api from './components/Api.js';
import { checkError } from './components/utils';
import PopupWIthImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import PopuWithForm from './components/PopupWIthForm.js';
import UserInfo from './components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: 'c29acbcd-e400-4694-90fd-37fde0fe5a19',
    'Content-Type': 'application/json',
  },
});

const formAddValidator = new FormValidator(validateSettings, formAdd);
const formEditValidator = new FormValidator(validateSettings, formEdit);
const formAvatarValidator = new FormValidator(validateSettings, formAvatar);

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

let myProfileId;

const popupWithFormEdit = new PopuWithForm({
  selector: '.popup-edit',
  submitForm: (obj) => {
    return api.setProfileAbout(obj.name, obj.about)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWithFormEdit.close();
      })
      .catch(checkError)
      .finally(() => {
        popupWithFormEdit.setButtonText();
      });
  },
});

popupWithFormEdit.setEventListeners();

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupWithFormEdit.open();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

const popupWIthAvatarChange = new PopuWithForm({
  selector: '.popup-avatar',
  submitForm: (obj) => {
    return api
      .changeAvatar(obj.link)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWIthAvatarChange.close();
      })
      .catch(checkError)
      .finally(() => {
        popupWIthAvatarChange.setButtonText();
      });
  },
});

popupWIthAvatarChange.setEventListeners();

// Обработчик кнопки смены аватара
avatarEditButton.addEventListener('click', () => {
  popupWIthAvatarChange.open();
});

const popupWithFormAdd = new PopuWithForm({
  selector: '.popup-add',
  submitForm: (obj) => {
    return api.addCardRequest(obj.title, obj.link)
      .then((data) => {
        cardElement.addItem(createElement(data));
        popupWithFormAdd.close();
      })
      .catch(checkError)
      .finally(() => {
        popupWithFormAdd.setButtonText();
      })
  },
});

popupWithFormAdd.setEventListeners();

// Обработчик кнопки добавления карточек
cardsAddButton.addEventListener('click', () => {
  popupWithFormAdd.open();
});

// Вызов функции валидации форм
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();



Promise.all([api.getProfileAbout(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    userInfo.setUserInfo(userData);
    
    myProfileId = userData._id;
    cardElement.rendererItems(cards.reverse());
  }
)
.catch(checkError);

const cardElement = new Section({
  items: [],
  renderer: (item) => {
    const card = createElement(item);
    cardElement.addItem(card);
  }
}, '.gallery');

const createElement = (data) => {
  const card = new Card({
    data,
    myProfileId,
    // Лайки работают не нормально, какая то шляпа с проверкой, не могу понять
    handleLike: () => {
      if (card.checkMyLike()) {
        api.removeLikeRequest(data._id)
          .then((data) => {
            card.removeLike();
            card.checkLikes(data.likes);
          })
          .catch(checkError);
      } else {
        api.setLikeRequest(data._id)
          .then((data) => {
            card.setLike()
            card.checkLikes(data.likes);
          })
          .catch(checkError);
      }
    },
    handleRemoveCard: () => {
      api.removeCard(data._id)
        .then(() => {
          card.removeCard()
        })
        .catch(checkError);
    },
    handleClick: () => {
      popupWIthImage.open(data);
    }
  }, '#card-template');
  return card.createCard();
}

const popupWIthImage = new PopupWIthImage('.popup-picture');
popupWIthImage.setEventListeners();

