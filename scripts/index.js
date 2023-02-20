const popupEdit = document.querySelector('.popup-edit');  
const popupAdd = document.querySelector('.popup-add');
const popupPicture = document.querySelector('.popup-picture');
// Формы и их содержимое
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
// Элементы формы Edit
const nameInput = formEdit.elements.name;
const aboutInput = formEdit.elements.about;
// Элементы формы Add
const pictureNameInput = formAdd.elements.title;
const linkInput = formAdd.elements.link;
// 
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');;
const profileEditButton = document.querySelector('.profile__edit-button');
const cardsAddButton = document.querySelector('.profile__add-button');
const gallery = document.querySelector('.gallery');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Функция открытия и закрытия попапов, так же закрытие при нажатии на оверлей, если таков имеется.
function popupHandler(trigger, popup, callback) {
  trigger.addEventListener('click', () => {
    openPopup(popup);
    callback();
  });
    const popupCloseButton = popup.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', () => closePopup(popup));

  if (popup.className.includes('overlay')) {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      };
    });
  };
};

// Вызов функции попапа с формой редактирования профиля
popupHandler(profileEditButton, popupEdit, () => {
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;
});

// Вызов функции попапа с формой добавления карточек
popupHandler(cardsAddButton, popupAdd, () => {
  formAdd.reset();
});

// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault();  
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
};

// Cабмит формы редактирования
formEdit.addEventListener('submit', editFormSubmit);

// Функция создания, удаления и просмотра карточек
function createCard(titleValue, photoValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardPhoto.src = photoValue;
  cardPhoto.alt = titleValue;

  popupHandler(cardPhoto, popupPicture, () => {
    popupPicture.querySelector('.popup-picture__image').src = photoValue;
    popupPicture.querySelector('.popup-picture__image').alt = titleValue;
    popupPicture.querySelector('.popup-picture__caption').textContent = titleValue;
  })

  // Смена цвета кнопки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  // Удаление карточки
  cardElement.querySelector('.card__trash-button').addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
};

// Функция добавления карточки
function addCard(card, container) {
  container.prepend(card);
};

// Обработчик формы добавления карточек
function addFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(pictureNameInput.value, linkInput.value);

  addCard(card, gallery);
  evt.target.querySelector('.form__button').classList.add('form__button_disabled')
  closePopup(popupAdd);
};

// Кнопка сабмита формы добавления карточек
formAdd.addEventListener('submit', addFormSubmit);

// Функция заполнения галереи карточками из массива
function addCardsArray (array) {
  array.reverse().forEach(element => {
    const item = createCard(element.name, element.link);
    
    addCard(item, gallery);
  });
};

// Вызов функции заполнения галереи 
addCardsArray(initialCards);

// Валидация форм
const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  error.textContent = errorMessage;
  error.classList.add('form__error_active')
}

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  input.classList.remove('form__input_type_error');
  error.textContent = '';
}

const checkValidity = (form, input) =>{
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage)
  } else {
    hideInputError(form, input)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__button_disabled')
  }
}

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const buttonSubmit = form.querySelector('.form__button');
  toggleButtonState(inputList, buttonSubmit)
  
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkValidity(form, input);
      toggleButtonState(inputList, buttonSubmit)
    })
  })
}

const enableValidation = () => {
  Array.from(document.forms).forEach(form => {
    setEventListeners(form);
  })
}

enableValidation()

// ПРойти регулярки еще раз...................

let regEx = /\W+\-/gi;

let a = 'бибаc - боба'

console.log(regEx.test(a));
console.log(a.match(regEx));
