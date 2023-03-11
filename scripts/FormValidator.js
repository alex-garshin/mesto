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
      this._form.querySelectorAll(this._obj.popupInputValidate)
    );

    this._buttonElement = this._form.querySelector(".popup__button");

    this.toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  };

  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add("popup__input_click_error");
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add("popup__error_visible");
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove("popup__input_click_error");
    this._errorElement.classList.remove("popup__error_visible");
    this._errorElement.textContent = "";
  };

  _checkInputValidity = (input) => {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);

    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  enableValidation = () => {
    this._form = document.querySelector(this._formElement);
    this._setEventListener();
  };
}
