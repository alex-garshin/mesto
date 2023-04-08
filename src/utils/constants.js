import { Api } from "../components/Api.js";
import avatar from "../images/avatar.png";
import headerLogo from "../images/header-logo.png";

export const inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
export const inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
export const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля попап
export const inputNameImg = document.querySelector(".popup__input_card_name"); //поле ввода имени
export const inputLink = document.querySelector(".popup__input_card_link"); //поле ввода ссылки
export const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинок попапа
export const formAdd = document.querySelector(".popup__form_add"); //форма добавления
export const formEdit = document.querySelector(".popup__form_edit"); //форма редактирования
export const formAvatar = document.querySelector(".popup__form_edit-avatar"); //форма редактирования
export const avatarButton = document.querySelector(
  ".profile__avatar-container"
);

export const popupValidate = {
  popupInputValidate: ".popup__input",
  popupButtonValidate: ".popup__button",
  popupInputError: "popup__input_click_error",
  popupButtonBlocked: "popup__button_blocked",
  popupError: "popup__error_visible",
};

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "78542652-31c8-4469-a72b-b4b9aeed68be",
    "Content-Type": "application/json",
  },
});

export const setImages = () => {
  document
    .getElementsByClassName("header__logo")[0]
    .setAttribute("src", headerLogo);
  document
    .getElementsByClassName("profile__avatar")[0]
    .setAttribute("src", avatar);
};
