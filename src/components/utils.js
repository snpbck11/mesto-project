 // Модальные окна
export const popupEdit = document.querySelector('.popup-edit');  
export const popupAdd = document.querySelector('.popup-add');
export const popupPicture = document.querySelector('.popup-picture');
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