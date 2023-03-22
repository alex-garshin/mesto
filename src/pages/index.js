import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
const inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
const inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля попап
const inputNameImg = document.querySelector(".popup__input_card_name"); //поле ввода имени
const inputLink = document.querySelector(".popup__input_card_link"); //поле ввода ссылки
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинок попапа
const formAdd = document.querySelector(".popup__form_add"); //форма добавления
const formEdit = document.querySelector(".popup__form_edit"); //форма редактирования
import avatar from "../images/avatar.png";
import headerLogo from "../images/header-logo.png";
import styles from "./index.css";

const popupValidate = {
  popupInputValidate: ".popup__input",
  popupButtonValidate: ".popup__button",
  popupInputError: "popup__input_click_error",
  popupButtonBlocked: "popup__button_blocked",
  popupError: "popup__error_visible",
};

const setImages = () => {
  document
    .getElementsByClassName("header__logo")[0]
    .setAttribute("src", headerLogo);
  document
    .getElementsByClassName("profile__avatar")[0]
    .setAttribute("src", avatar);
};

setImages();

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

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (img) => {
      const newCard = createCard(img);
      gallerySection.addItem(newCard);
    },
  },
  ".gallery"
);

const profile = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
});

const popupProf = new PopupWithForm(".popup_click_prof", processProfile);
const popupCard = new PopupWithForm(".popup_click_card", processCard);
const popupImg = new PopupWithImage(".popup_click_img");

const formsValidatorWrapper = () => {
  const validatorFormAdd = new FormValidator(popupValidate, formAdd);
  const validatorFormEdit = new FormValidator(popupValidate, formEdit);

  validatorFormAdd.enableValidation();
  validatorFormEdit.enableValidation();

  return { validatorFormAdd, validatorFormEdit };
};

const { validatorFormAdd, validatorFormEdit } = formsValidatorWrapper();

const openProf = () => {
  popupProf.open();
  const { profileName: name, profileJob: job } = profile.getUserInfo();
  inputName.value = name; //присваивание значения
  inputJob.value = job; //присваивание значения
  validatorFormEdit.toggleButtonState();
};

const openCard = () => {
  popupCard.open();
  validatorFormAdd.toggleButtonState();
};

function processProfile(formValues) {
  profile.setUserInfo({
    name: formValues[inputName.name],
    job: formValues[inputJob.name],
  });
}

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

function createCard(cardData) {
  return new Card(cardData, ".gallery__array", handleCardClick).generateCard();
}

function processCard(formValues) {
  const completCard = {
    name: formValues[inputNameImg.name],
    link: formValues[inputLink.name],
  };
  gallerySection.addItem(createCard(completCard));
}

gallerySection.renderItems();

editButton.addEventListener("click", openProf); //для открытия
addButton.addEventListener("click", openCard); //для открытия
