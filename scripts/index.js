import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
const popupProf = document.querySelector(".popup_click_prof"); //попап профиль
const profileName = document.querySelector(".profile__name"); //имя
const profileJob = document.querySelector(".profile__job"); //профессия
const formPopup = popupProf.querySelector(".popup__form"); //форма попапа
const popupProfInput = formPopup.querySelector(".popup__input"); //поле ввода профиля
const profButton = formPopup.querySelector(".popup__button"); //кнопка профиля
const inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
const inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля попап
const closeButtonProfil = document.querySelector(".popup__close_profile"); //кнопка закрытия попапа ghjabkz
const popupCard = document.querySelector(".popup_click_card"); //попап добавление картинки
const gallery = document.querySelector(".gallery"); //галерея
const formPopupImg = popupCard.querySelector(".popup__form"); //форма попапа
const cardInput = formPopupImg.querySelectorAll(".popup__input"); //поле ввода добавления
const cardButton = formPopupImg.querySelector(".popup__button"); //кнопка добавления
const inputNameImg = document.querySelector(".popup__input_card_name"); //поле ввода имени
const inputLink = document.querySelector(".popup__input_card_link"); //поле ввода ссылки
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинок попапа
const closeButtonCard = document.querySelector(".popup__close_card"); //кнопка закрытия попапа
const closeButtonImg = document.querySelector(".popup__close_img"); //кнопка закрытия попапа
export const popupImg = document.querySelector(".popup_click_img"); //попап картинка
export const popupImages = popupImg.querySelector(".popup__img"); //картинка
export const popupText = popupImg.querySelector(".popup__text"); //текст

const popupValidate = {
  popupInputValidate: ".popup__input",
  popupButtonValidate: ".popup__button",
  popupInputError: "popup__input_click_error",
  popupButtonBlocked: "popup__button_blocked",
  popupError: "popup__error_visible",
};

//массив картинок
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validatorForm = new FormValidator(popupValidate, ".popup__form");
validatorForm.enableValidation();

const openProf = () => {
  openPopup(popupProf);
  inputName.value = profileName.textContent.trim(); //присваивание значения
  inputJob.value = profileJob.textContent.trim(); //присваивание значения
  validatorForm.toggleButtonState(popupProfInput, profButton, popupValidate);
};

const openCard = () => {
  openPopup(popupCard);
  validatorForm.toggleButtonState(cardInput, cardButton, popupValidate);
};

const closePopup = (clickPopup) => {
  clickPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", processEscape);
  clickPopup.removeEventListener("click", processClick);
};

export const openPopup = (clickPopup) => {
  clickPopup.classList.add("popup_opened");
  document.addEventListener("keydown", processEscape);
  clickPopup.addEventListener("click", processClick);
};

const processEscape = (event) => {
  if (event.key === "Escape") {
    const clickPopup = document.querySelector(".popup_opened");
    closePopup(clickPopup);
  }
};

const processClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

const processProfile = (event) => {
  const clickPopup = event.target.closest(".popup");
  event.preventDefault(); //откат без изменений
  profileName.textContent = inputName.value; //редактирование
  profileJob.textContent = inputJob.value; //редактирование
  closePopup(clickPopup);
};

const displayCard = (cardBox, cardItem, isPrepend = false) => {
  if (isPrepend) {
    cardBox.prepend(cardItem);
  } else {
    cardBox.append(cardItem);
  }
};

const processCard = (event) => {
  const clickPopup = event.target.closest(".popup");
  event.preventDefault(); //откат без изменений
  if (inputNameImg.value !== "" && inputLink.value !== "") {
    const completCard = { name: inputNameImg.value, link: inputLink.value };
    displayCard(
      gallery,
      new Card(completCard, ".gallery__array").generateCard(),
      true
    );
  }
  closePopup(clickPopup);
  event.target.reset();
};

initialCards.forEach((item) =>
  displayCard(gallery, new Card(item, ".gallery__array").generateCard(), false)
); //заполнение страницы

editButton.addEventListener("click", openProf); //для открытия
addButton.addEventListener("click", openCard); //для открытия
closeButtonProfil.addEventListener("click", () => {
  closePopup(popupProf);
}); //для закрытия
closeButtonCard.addEventListener("click", () => {
  closePopup(popupCard);
}); //для закрытия
closeButtonImg.addEventListener("click", () => {
  closePopup(popupImg);
}); //для закрытия
formPopup.addEventListener("submit", processProfile); //для отправки
formPopupImg.addEventListener("submit", processCard); //для отправки
