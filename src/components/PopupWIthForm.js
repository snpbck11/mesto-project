import Popup from "./Popup.js";
import Api from "./Api.js"

export default class PopuWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector)
    this.submitForm = submitForm;
  }
  
}