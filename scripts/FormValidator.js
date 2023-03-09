export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  }

  _hasInvalidInput = (inputList) => {
    const inputArray = Array.from(inputList);
    return inputArray.some((inputElement) => !inputElement.validity.valid);
  };

  toggleButtonState = (inputList, buttonItem, object) => {
    if (this._hasInvalidInput(inputList)) {
      buttonItem.classList.add(object.popupButtonBlocked);
      buttonItem.setAttribute("disabled", true);
    } else {
      buttonItem.classList.remove(object.popupButtonBlocked);
      buttonItem.removeAttribute("disabled");
    }
  };

  _setEventListener = (form, object) => {
    const inputList = Array.from(
      form.querySelectorAll(object.popupInputValidate)
    );

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(form, input, object);
      });
    });
  };

  _checkInputValidity = (form, input, object) => {
    const errorLink = document.querySelector(`.${input.dataset.error}`);
    if (!input.validity.valid) {
      input.classList.add(object.popupInputError);
      errorLink.classList.add(object.popupError);
      errorLink.textContent = input.validationMessage;
    } else {
      input.classList.remove(object.popupInputError);
      errorLink.classList.remove(object.popupError);
      errorLink.textContent = "";
    }
    this.toggleButtonState(
      form.querySelectorAll(object.popupInputValidate),
      form.querySelector(object.popupButtonValidate),
      object
    );
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formElement));
    formList.forEach((form) => {
      this._setEventListener(form, this._obj);
    });
  };
}
