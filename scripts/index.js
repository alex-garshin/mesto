import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
export const popupImg = document.querySelector(".popup_click_img"); //попап картинка
export const popupImages = popupImg.querySelector(".popup__img"); //картинка
export const popupText = popupImg.querySelector(".popup__text"); //текст
const popupProf = document.querySelector(".popup_click_prof"); //попап профиль
const profileName = document.querySelector(".profile__name"); //имя
const profileJob = document.querySelector(".profile__job"); //профессия
const formPopup = popupProf.querySelector(".popup__form"); //форма попапа
const inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
const inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля попап
const closeButtonProfil = document.querySelector(".popup__close_profile"); //кнопка закрытия попапа ghjabkz
const popupCard = document.querySelector(".popup_click_card"); //попап добавление картинки
const gallery = document.querySelector(".gallery"); //галерея
const formPopupImg = popupCard.querySelector(".popup__form"); //форма попапа
const inputNameImg = document.querySelector(".popup__input_card_name"); //поле ввода имени
const inputLink = document.querySelector(".popup__input_card_link"); //поле ввода ссылки
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинок попапа
const closeButtonCard = document.querySelector(".popup__close_card"); //кнопка закрытия попапа
const closeButtonImg = document.querySelector(".popup__close_img"); //кнопка закрытия попапа
const formAdd = document.querySelector(".popup__form_add"); //форма добавления
const formEdit = document.querySelector(".popup__form_edit"); //форма редактирования

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

const formsValidatorWrapper = () => {
  const validatorFormAdd = new FormValidator(popupValidate, formAdd);
  const validatorFormEdit = new FormValidator(popupValidate, formEdit);

  validatorFormAdd.enableValidation();
  validatorFormEdit.enableValidation();

  return { validatorFormAdd, validatorFormEdit };
};

const { validatorFormAdd, validatorFormEdit } = formsValidatorWrapper();

const openProf = () => {
  openPopup(popupProf);
  inputName.value = profileName.textContent.trim(); //присваивание значения
  inputJob.value = profileJob.textContent.trim(); //присваивание значения
  validatorFormEdit.toggleButtonState();
};

const openCard = () => {
  openPopup(popupCard);
  validatorFormAdd.toggleButtonState();
};

const closePopup = (popupClick) => {
  document.removeEventListener("keydown", processEscape);
  popupClick.classList.remove("popup_opened");
};

export const openPopup = (popupClick) => {
  document.addEventListener("keydown", processEscape);
  popupClick.classList.add("popup_opened");
};

function processEscape(event) {
  if (event.key === "Escape") {
    const popupClick = document.querySelector(".popup_opened");
    closePopup(popupClick);
  }
}

const processClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

const processProfile = (event) => {
  event.preventDefault(); //откат без изменений
  profileName.textContent = inputName.value; //редактирование
  profileJob.textContent = inputJob.value; //редактирование
  closePopup(popupProf);
};

const displayPrependedCard = (cardBox, cardItem) => {
  cardBox.prepend(cardItem);
};

const displayAppendedCard = (cardBox, cardItem) => {
  cardBox.append(cardItem);
};

const createCard = (cardData) => {
  return new Card(cardData, ".gallery__array").generateCard();
};

const processCard = (event) => {
  event.preventDefault(); //откат без изменений

  const completCard = { name: inputNameImg.value, link: inputLink.value };
  displayPrependedCard(gallery, createCard(completCard));

  closePopup(popupCard);
  event.target.reset();
};

initialCards.forEach((item) => displayAppendedCard(gallery, createCard(item))); //заполнение страницы

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
popupCard.addEventListener("click", processClick);
popupProf.addEventListener("click", processClick);
popupImg.addEventListener("click", processClick);
