export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }

  // Показать ошибку валидации
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  // Скрыть ошибку валидации
  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = "";
  }

  // Проверка инпута на валидность, и всплытие соответсвующих validationMessage
  _checkValidity(input) {
    if (input.validity.patternMismatch) {
        this._showInputError(input, input.dataset.error);
      } else if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
  }

  // Поиск невалидного инпута
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Смена состояния кнопки в зависимости от валидности формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Функция установки прослушивателя события
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonSubmit);

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonSubmit);
      }, 0);
    });

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidity(input);
        this._toggleButtonState(inputList, buttonSubmit);
      });
    });
  }

  // Валидация всех форм
  enableValidation() {
    this._setEventListeners();
  }
}
