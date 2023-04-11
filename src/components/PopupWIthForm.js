import Popup from "./Popup.js";

export default class PopuWithForm extends Popup {
  constructor({ selector, submitForm }) {
    super(selector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".form");
    this._submitter = this._form.querySelector(".form__button");
    this._initialText = this._submitter.textContent;
    this._inputs = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitter.textContent = "Сохранение...";
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setButtonText() {
    this._submitter.textContent = this._initialText;
  }
}
