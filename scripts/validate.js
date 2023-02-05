const popupValidate = {
  popupFormValidate: ".popup__form",
  popupInputValidate: ".popup__input",
  popupButtonValidate: ".popup__button",
  popupInputError: "popup__input_click_error",
  popupButtonBlocked: "popup__button_blocked",
  popupError: "popup__error_visible",
};

const hasInvalidInput = (inputList) => {
  const inputArray = Array.from(inputList);
  return inputArray.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonItem, object) => {
  if (hasInvalidInput(inputList)) {
    buttonItem.classList.add(object.popupButtonBlocked);
    buttonItem.setAttribute("disabled", true);
  } else {
    buttonItem.classList.remove(object.popupButtonBlocked);
    buttonItem.removeAttribute("disabled");
  }
};

const setEventListener = (form, object) => {
  const inputList = Array.from(
    form.querySelectorAll(object.popupInputValidate)
  );
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, object);
    });
  });
};

const checkInputValidity = (form, input, object) => {
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
  toggleButtonState(
    form.querySelectorAll(object.popupInputValidate),
    form.querySelector(object.popupButtonValidate),
    object
  );
};

const enableValidation = (object) => {
  const formList = Array.from(
    document.querySelectorAll(object.popupFormValidate)
  );
  formList.forEach((form) => {
    setEventListener(form, object);
  });
};

enableValidation(popupValidate);
