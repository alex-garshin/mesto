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
  toggleButtonState(popupProfInput, profButton, popupValidate);
};

const openCard = () => {
  openPopup(popupCard);
  toggleButtonState(cardInput, cardButton, popupValidate);
};

const closePopup = (clickPopup) => {
  clickPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", processEscape);
  clickPopup.removeEventListener("click", processClick);
};

const openPopup = (clickPopup) => {
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

const fillCard = (cards) => {
  openPopup(popupImg);
  popupImages.setAttribute("alt", cards.name);
  popupImages.setAttribute("src", cards.link);
  popupText.textContent = cards.name;
};

const generateCard = (cardObj) => {
  const galleryCardArray = galleryArray
    .querySelector(".gallery__card")
    .cloneNode(true);
  const galleryImg = galleryCardArray.querySelector(".gallery__pic");
  galleryImg.setAttribute("alt", cardObj.name);
  galleryImg.setAttribute("src", cardObj.link);
  galleryImg.addEventListener("click", () => {
    fillCard(cardObj);
  });
  const galleryName = galleryCardArray.querySelector(".gallery__text");
  galleryName.textContent = cardObj.name;
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
    displayCard(gallery, generateCard(completCard), true);
  }
  closePopup(clickPopup);
  event.target.reset();
};

initialCards.forEach((item) => displayCard(gallery, generateCard(item), false)); //заполнение страницы

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
