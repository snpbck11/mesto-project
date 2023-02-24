// Модальные окна
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup-edit');  
export const popupAdd = document.querySelector('.popup-add');
export const popupPicture = document.querySelector('.popup-picture');
// Изображение карточки в попапе
export const picture = popupPicture.querySelector('.popup-picture__image')
// Подпись к карточке в попапе
export const caption = popupPicture.querySelector('.popup-picture__caption')
// Формы и их элементы
export const formEdit = document.forms.edit;
export const formAdd = document.forms.add;
export const nameInput = formEdit.elements.name;
export const aboutInput = formEdit.elements.about;
export const pictureNameInput = formAdd.elements.title;
export const linkInput = formAdd.elements.link;
// Имя и профессия профиля
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
// Кнопки редактирования профиля, и добавления карточек
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardsAddButton = document.querySelector('.profile__add-button');
// Галерея карточек
export const gallery = document.querySelector('.gallery');
// Массив карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 