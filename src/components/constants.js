// Модальные окна
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup-edit');  
export const popupAdd = document.querySelector('.popup-add');
export const popupPicture = document.querySelector('.popup-picture');
export const popupAvatar = document.querySelector('.popup-avatar');
// Изображение карточки в попапе
export const picture = popupPicture.querySelector('.popup-picture__image');
// Подпись к карточке в попапе
export const caption = popupPicture.querySelector('.popup-picture__caption');
// Формы и их элементы
export const formEdit = document.forms.edit;
export const formAdd = document.forms.add;
export const formAvatar = document.forms.avatar;
export const formConfirm = document.forms.confirm;
export const nameInput = formEdit.elements.name;
export const aboutInput = formEdit.elements.about;
export const pictureNameInput = formAdd.elements.title;
export const linkInput = formAdd.elements.link;
export const avatarLink = formAvatar.querySelector('#avatar-link');
// Имя и профессия профиля
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
// Кнопки редактирования профиля, и добавления карточек
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardsAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
// Галерея карточек
export const gallery = document.querySelector('.gallery');
// Конфиг валидации форм
export const validateSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};
// Мой профиль
export const myProfile = {
  id: '',
  name: ''
};