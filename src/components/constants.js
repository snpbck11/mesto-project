// Модальные окна
export const popupPicture = document.querySelector('.popup-picture');
// Изображение карточки в попапе
export const picture = popupPicture.querySelector('.popup-picture__image');
// Подпись к карточке в попапе
export const caption = popupPicture.querySelector('.popup-picture__caption');
// Формы и их элементы
export const formEdit = document.querySelector('.form-edit');
export const formAdd = document.querySelector('.form-add');
export const formAvatar = document.querySelector('.form-avatar');
export const formConfirm = document.querySelector('.form-confirm');
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