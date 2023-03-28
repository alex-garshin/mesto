export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  }

  _hasInvalidInput = () => {
    const inputArray = Array.from(this._inputList);
    return inputArray.some((inputElement) => !inputElement.validity.valid);
  };

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._obj.popupButtonBlocked);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._obj.popupButtonBlocked);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListener = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._obj.popupInputValidate)
    );

    this._buttonElement = this._formElement.querySelector(
      this._obj.popupButtonValidate
    );

    this.toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  };

  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._obj.popupInputError);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._obj.popupError);
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._obj.popupInputError);
    this._errorElement.classList.remove(this._obj.popupError);
    this._errorElement.textContent = "";
  };

  _checkInputValidity = (input) => {
    this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  enableValidation = () => {
    this._setEventListener();
  };
}
