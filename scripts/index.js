const popupEdit = document.querySelector('.popup-edit');  
const popupAdd = document.querySelector('.popup-add');
const popupPicture = document.querySelector('.popup-open-picture');
const popupPictureClose = popupPicture.querySelector('.popup__close-button');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = formEdit.querySelector('#person-name'); 
const aboutInput = formEdit.querySelector('#person-about');
const pictureNameInput = formAdd.querySelector('#picture-name');
const linkInput = formAdd.querySelector('#picture-link');
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

function callback() {
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent;

  pictureNameInput.value = '';
  linkInput.value = ''
};

// Функция открытия и закрытия попапов, так же закрытие при нажатии на оверлей, если таков имеется. 3```
function popupHandler(trigger, popup) {
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

popupHandler(profileEditButton, popupEdit);

// Вызов функции попапа с формой добавления карточек
popupHandler(cardsAddButton, popupAdd);

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

// Функция создания карточки (добавления, удаления и просмотра карточек
function createCard(titleValue, photoValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardPhoto.src = photoValue;
  cardPhoto.alt = titleValue;

   // Просмотр карточки 
  cardPhoto.addEventListener('click', () => { 
    document.querySelector('.popup-open-picture__image').src = photoValue;
    document.querySelector('.popup-open-picture__image').alt = titleValue;
    document.querySelector('.popup-open-picture__caption').textContent = titleValue;
    openPopup(popupPicture);
  });

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

  closePopup(popupAdd);
};

// Кнопка сабмита формы добавления карточек
formAdd.addEventListener('submit', addFormSubmit);

//Функция закрытия попапа с изображением
popupPictureClose.addEventListener('click', () => closePopup(popupPicture));

// Функция заполнения галереи карточками из массива
function addCardsArray (array) {
  array.forEach(element => {
    const item = createCard(element.name, element.link);
    
    addCard(item, gallery);
  });
};

// Вызов функции заполнения галереи 
addCardsArray(initialCards);







