  // Показать ошибку валидации
  const showInputError = (form, input, errorMessage, settings) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(`${settings.inputErrorClass}`);
    error.textContent = errorMessage;
    error.classList.add(`${settings.errorClass}`)
  }
  // Скрыть ошибку валидации
  const hideInputError = (form, input, settings) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(`${settings.inputErrorClass}`);
    error.textContent = '';
  }
  // Проверка инпута на валидность, и всплытие соответсвующих validationMessage
  const checkValidity = (form, input, settings) =>{
    if (input.validity.patternMismatch) {
      showInputError(form, input, input.dataset.error, settings)
    } else if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, settings)
    } else {
      hideInputError(form, input, settings)
    }
  }
  // Поиск невалидного инпута
  const hasInvalidInput = (inputList) => {
    return inputList.some(input => {
      return !input.validity.valid;
    })
  }
  // Смена состояния кнопки в зависимости от валидности формы
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`)
    }
  }
  // Функция установки прослушивателя события
  const setEventListeners = (form, settings) => {
    const inputList = Array.from(form.querySelectorAll(`${settings.inputSelector}`));
    const buttonSubmit = form.querySelector(`${settings.submitButtonSelector}`);
    toggleButtonState(inputList, buttonSubmit, settings)

    form.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputList, buttonSubmit, settings);
      }, 0);
    });
    
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        checkValidity(form, input, settings);
        toggleButtonState(inputList, buttonSubmit, settings)
      })
    })
  }
  // Валидация всех форм
  export const enableValidation = (settings) => {
    Array.from(document.querySelectorAll(`${settings.formSelector}`)).forEach(form => {
      setEventListeners(form, settings);
    })
  }