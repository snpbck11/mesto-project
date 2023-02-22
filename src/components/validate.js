export const enableValidation = (config) => {
  // Показать ошибку валидации
  const showInputError = (form, input, errorMessage) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(`${config.inputErrorClass}`);
    error.textContent = errorMessage;
    error.classList.add(`${config.errorClass}`)
  }
  // Скрыть ошибку валидации
  const hideInputError = (form, input) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(`${config.inputErrorClass}`);
    error.textContent = '';
  }
  // Проверка инпута на валидность, и всплытие соответсвующих validationMessage
  const checkValidity = (form, input) =>{
    if (input.validity.patternMismatch) {
      showInputError(form, input, input.dataset.error)
    } else if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage)
    } else {
      hideInputError(form, input)
    }
  }
  // Поиск невалидного инпута
  const hasInvalidInput = (inputList) => {
    return inputList.some(input => {
      return !input.validity.valid;
    })
  }
  // Смена состояния кнопки в зависимости от валидности формы
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(`${config.inactiveButtonClass}`);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(`${config.inactiveButtonClass}`)
    }
  }
  // Функция установки прослушивателя события
  const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(`${config.inputSelector}`));
    const buttonSubmit = form.querySelector(`${config.submitButtonSelector}`);
    toggleButtonState(inputList, buttonSubmit)

    form.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputList, buttonSubmit);
      }, 0);
    });
    
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        checkValidity(form, input);
        toggleButtonState(inputList, buttonSubmit)
      })
    })
  }
  // Валидация всех форм
  const startFormValidation = () => {
    Array.from(document.querySelectorAll(`${config.formSelector}`)).forEach(form => {
      setEventListeners(form);
    })
  }

  startFormValidation();
}