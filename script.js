const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('#person-name');
const jobInput = formElement.querySelector('#person-about');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;  
    document.querySelector('.profile__name').textContent = name;
    document.querySelector('.profile__about').textContent = job;
    toggleForm();
}

// Кнопка сабмита формы
formElement.addEventListener('submit', handleFormSubmit);

// Функия открытия и закрытия попапа
function toggleForm() {
  popup.classList.toggle('popup_opened');
};


// Надо сделать функия открытия и закрытия попапа

editButton.addEventListener('click', toggleForm);

closeButton.addEventListener('click', toggleForm);

