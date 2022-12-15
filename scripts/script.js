const popupEdit = document.querySelector('.popup-edit');  
const popupAdd = document.querySelector('.popup-add');
const popupPicture = document.querySelector('.popup-open-picture');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = formEdit.querySelector('#person-name'); 
const aboutInput = formEdit.querySelector('#person-about');
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

// cardsAddButton.addEventListener('click', () => {openPopup(popupAdd)});

// Функция открытия и закрытия попапов, так же закрытие при нажатии на оверлей, если таков имеется. Отдельный колбэк для попапа редактирования.
function popupHandler(trigger, popup, callback) {
  function editCallback () {
    if (callback === edit) {
      nameInput.value = profileName.textContent;
      aboutInput.value = profileAbout.textContent;
    };
  };
  
  trigger.addEventListener('click', () => {
    openPopup(popup);
    editCallback();
  });   

  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', () => closePopup(popup));  

  if (popup.className.includes('overlay')) {
    popup.addEventListener('mousedown', function(evt) {
      if (evt.target === popup) {
        closePopup(popup);
      };
    });
  };
};

popupHandler(profileEditButton, popupEdit, edit);

popupHandler(cardsAddButton, popupAdd);

// Вызов функции окна редактирования

// Вызов функции окна добавления карточек



// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault();  
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
};

// Кнопка сабмита формы редактирования
formEdit.addEventListener('submit', editFormSubmit);

// // Функция добавления, удаления и просмотра карточек
// function addCard(titleValue, photoValue) {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

//   cardElement.querySelector('.card__title').textContent = titleValue;
//   cardElement.querySelector('.card__photo').src = photoValue;
//   cardElement.querySelector('.card__photo').alt = titleValue;

//   // Просмотр карточки
//   cardElement.querySelector('.card__photo').addEventListener('mousedown', function(evt) { 
//     document.querySelector('.popup-open-picture__image').src = photoValue;
//     document.querySelector('.popup-open-picture__image').alt = photoValue;
//     document.querySelector('.popup-open-picture__caption').textContent = titleValue;
//     popupHandler(evt.target, popupPicture);
//   });
//   // Смена цвета кнопки лайка
//   cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
//      evt.target.classList.toggle('card__like-button_active');
//   });
//   // Удаление карточки
//   cardElement.querySelector('.card__trash-button').addEventListener('click', () => {
//     cardElement.remove();
//   });
  
//   gallery.prepend(cardElement);  
// };

// // Обработчик формы добавления карточек
// function addFormSubmit(evt) {
//   evt.preventDefault();  
//   const pictureNameInput = formAdd.querySelector('#picture-name');
//   const urlInput = formAdd.querySelector('#picture-url');

//   addCard(pictureNameInput.value, urlInput.value);

//   popupAdd.classList.remove('popup_opened');

//   pictureNameInput.value = '';
//   urlInput.value = '';
// };

// // Кнопка сабмита формы добавления карточек
// formAdd.addEventListener('submit', addFormSubmit);

// // Функция заполнения галереи карточками из массива
// function addCardsArray (array) {
//   array.forEach(element => {
//     const name = element.name;
//     const link = element.link;
//     addCard(name, link);    
//   });
// };

// // Вызов функции заполнения галереи 
// addCardsArray(initialCards);














