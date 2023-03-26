import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selector, processSubmit) {
    super(selector);
    this._form = this._popupType.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;

    this._processSubmit = (evt) => {
      evt.preventDefault();
      processSubmit(this._getInputValues());
      this.close();
    };
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._processSubmit);
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close = () => {
    super.close();
    this._form.removeEventListener("submit", this._processSubmit);
    this._form.reset();
  };

  isLoading(str) {
    str
      ? (this._submitButton.textContent = str)
      : (this._submitButton.textContent = this._submitButtonText);
  }
}
