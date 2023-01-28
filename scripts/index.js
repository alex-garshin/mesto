<<<<<<< HEAD
const popupProf = document.querySelector(".popup_click_prof"); //попап профиль
const profileName = document.querySelector(".profile__name"); //имя
const profileJob = document.querySelector(".profile__job"); //профессия
const formPopup = popupProf.querySelector(".popup__form"); //форма попапа
const inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
const inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля попап
const closeButtonProfil = document.querySelector(".popup__close_profile"); //кнопка закрытия попапа
const popupCard = document.querySelector(".popup_click_card"); //попап добавление картинки
const gallery = document.querySelector(".gallery"); //галерея
const formPopupImg = popupCard.querySelector(".popup__form"); //форма попапа
const inputNameImg = document.querySelector(".popup__input_card_name"); //поле ввода имени
const inputLink = document.querySelector(".popup__input_card_link"); //поле ввода ссылки
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинок попапа
const closeButtonCard = document.querySelector(".popup__close_card"); //кнопка закрытия попапа
const galleryArray = document.querySelector(".gallery__array").content; //заполнение картинок через массив 
const popupImg = document.querySelector(".popup_click_img"); //попап картинка
const popupImages = popupImg.querySelector(".popup__img"); //картинка
const popupText = popupImg.querySelector(".popup__text"); //текст
const closeButtonImg = document.querySelector(".popup__close_img"); //кнопка закрытия попапа

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

const openProf = () => {
  openPopup(popupProf);
  inputName.value = profileName.textContent.trim(); //присваивание значения
  inputJob.value = profileJob.textContent.trim(); //присваивание значения
};

const closePopup = (popupClick) => {
  popupClick.classList.remove("popup_opened");
};

const openPopup = (popupClick) => {
  popupClick.classList.add("popup_opened");
};

const processProfile = (event) => {
  const popupClick = event.target.closest(".popup");
  event.preventDefault(); //откат без изменений
  profileName.textContent = inputName.value; //редактирование
  profileJob.textContent = inputJob.value; //редактирование
  closePopup(popupClick);
};



const fillCard = (event) => {
  openPopup(popupImg);
  const link = event.target.closest(".gallery__card").querySelector(".gallery__pic").getAttribute("src");
  const name = event.target.closest(".gallery__card").querySelector(".gallery__text").textContent;
  popupImages.setAttribute("alt", name);
  popupImages.setAttribute("src", link);
  popupText.textContent = name;
};

const cardGenerate = (array) => {
  const galleryCardArray = galleryArray
  .querySelector(".gallery__card")
  .cloneNode(true);
  const galleryImg = galleryCardArray.querySelector(".gallery__pic");
  galleryImg.setAttribute("alt", array.name);
  galleryImg.setAttribute("src", array.link);
  galleryImg.addEventListener("click", fillCard);
  const galleryName = galleryCardArray.querySelector(".gallery__text");
  galleryName.textContent = array.name;
  const galleryDelete = galleryCardArray.querySelector(".gallery__delete");
  galleryDelete.addEventListener("click", deleteImage);
  const galleryLike = galleryCardArray.querySelector(".gallery__like");
  galleryLike.addEventListener("click", likeImage);
  return galleryCardArray;
};

const deleteImage = (event) => {
  event.target.closest(".gallery__card").remove();
};

const likeImage = (event) => {
  event.target.classList.toggle("gallery__like_active");
};

const cardDisplay = (cardBox, cardItem, card = false) => {
  if (card) {
  cardBox.prepend(cardItem);
  } else {
  cardBox.append(cardItem);
  }
};

const processCard = (event) => {
  const popupClick = event.target.closest(".popup");
  event.preventDefault(); //откат без изменений
  if (inputNameImg.value !== "" && inputLink.value !== "") {
  const cardСomplet = { name: inputNameImg.value, link: inputLink.value };
  cardDisplay(gallery, cardGenerate(cardСomplet), true);
  }
  closePopup(popupClick);
};

initialCards.forEach((item) => cardDisplay(gallery, cardGenerate(item), false)); //заполнение страницы


editButton.addEventListener("click", openProf); //для открытия
addButton.addEventListener("click", () => { openPopup(popupCard);}); //для открытия
closeButtonProfil.addEventListener("click", () => { closePopup(popupProf)}); //для закрытия
closeButtonCard.addEventListener("click", () => { closePopup(popupCard)}); //для закрытия
closeButtonImg.addEventListener("click", () => { closePopup(popupImg);}); //для закрытия
formPopup.addEventListener("submit", processProfile); //для отправки
formPopupImg.addEventListener("submit", processCard); //для отправки
=======
let popup = document.querySelector(".popup"); //попап
let formPopup = document.querySelector(".popup__form"); //форма попапа
let profileName = document.querySelector(".profile__name"); //имя
let inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
let profileJob = document.querySelector(".profile__job"); //профессия
let inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
let editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования попапа
let closeButton = document.querySelector(".popup__close"); //кнопка закрытия попапа

let openPopup = function () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;//присваивание значения
    inputJob.value = profileJob.textContent;//присваивание значения
}

let closePopup = function () {
    popup.classList.remove('popup_opened');
}

let formSubmit = (evt) => {
    evt.preventDefault(); //откат без изменений
    profileName.textContent = inputName.value; //редактирование
    profileJob.textContent = inputJob.value; //редактирование
    closePopup();
}

editButton.addEventListener('click', openPopup); //для открытия
closeButton.addEventListener('click', closePopup); //для закрытия
formPopup.addEventListener('submit', formSubmit); //для отправки
>>>>>>> origin/main
