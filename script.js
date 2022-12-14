const popupEdit = document.querySelector('.popup-edit');  
const popupAdd = document.querySelector('.popup-add');
const popupPicture = document.querySelector('.popup-open-picture');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const nameInput = formEdit.querySelector('#person-name'); 
const aboutInput = formEdit.querySelector('#person-about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const gallery = document.querySelector('.gallery');

// Функция открытия и закрытия попапов, так же закрытие при нажатии на оверлей, если таков имеется
function popupHandler(trigger, popup) {
  trigger.addEventListener('click', () => {
    popup.classList.add('popup_opened');
  });
  const close = popup.querySelector('.popup__close-button');
  close.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  });
  if (popup.className.includes('overlay')) {
    popup.addEventListener('mousedown', function(evt) {
      if (evt.target === popup) {
        popup.classList.remove('popup_opened');
      };
    });
  };
};
// Вызов функции окна редактирования
popupHandler(editButton, popupEdit);

// Вызов функции окна добавления карточек
popupHandler(addButton, popupAdd);


// Обработчик «отправки» формы редактирования
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const about = aboutInput.value;  
    document.querySelector('.profile__name').textContent = name;
    document.querySelector('.profile__about').textContent = about;
    popupEdit.classList.remove('popup_opened');
};

// Кнопка сабмита формы редактирования
formEdit.addEventListener('submit', editFormSubmit);

// Функция добавления, удаления и просмотра карточек
function addCard(titleValue, photoValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__photo').src = photoValue;
  cardElement.querySelector('.card__photo').alt = titleValue;

  // Просмотр карточки
  cardElement.querySelector('.card__photo').addEventListener('mousedown', function(evt) { 
    document.querySelector('.popup-open-picture__image').src = photoValue;
    document.querySelector('.popup-open-picture__image').alt = titleValue;
    document.querySelector('.popup-open-picture__caption').textContent = titleValue;
    popupHandler(evt.target, popupPicture);
  });
  // Смена цвета кнопки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
     evt.target.classList.toggle('card__like-button_active');
  });
  // Удаление карточки
  cardElement.querySelector('.card__trash-button').addEventListener('click', () => {
    cardElement.remove();
  });
  
  gallery.prepend(cardElement); 
};

// Обработчик формы добавления карточек
function addFormSubmit(evt) {
  evt.preventDefault();  
  const pictureNameInput = formAdd.querySelector('#picture-name');
  const urlInput = formAdd.querySelector('#picture-url');

  addCard(pictureNameInput.value, urlInput.value);

  popupAdd.classList.remove('popup_opened');

  pictureNameInput.value = '';
  urlInput.value = '';
};

// Кнопка сабмита формы добавления карточек
formAdd.addEventListener('submit', addFormSubmit);

// Функция заполнения галереи карточками из массива
function addCardsArray (array) {
  array.forEach(element => {
    const name = element.name;
    const link = element.link;
    addCard(name, link);    
  });
};

// Вызов функции заполнения галереи 
addCardsArray(initialCards);














