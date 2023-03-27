import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
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

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "96420521-2cf3-4ce8-a5f9-6a7817778898",
    "Content-Type": "application/json",
  },
});

const setImages = () => {
  document
    .getElementsByClassName("header__logo")[0]
    .setAttribute("src", headerLogo);
  document
    .getElementsByClassName("profile__avatar")[0]
    .setAttribute("src", avatar);
};

setImages();

const profile = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  profileAvatarSelector: ".profile__avatar",
});

let myProfile;
profile
  .fetchUserData()
  .then((data) => {
    profile.setUserInfo();
    myProfile = data;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

let gallerySection;
const renderSection = (data, profile) => {
  gallerySection = new Section(
    {
      items: data.map((item) => ({
        name: item.name,
        link: item.link,
        id: item["_id"],
        likes: item.likes,
        owner: item.owner,
        isLiked: !!item.likes.find((like) => {
          return like["_id"] === profile["_id"];
        }),
        isOwner: item.owner["_id"] === profile["_id"],
      })),
      renderer: (img) => {
        const newCard = createCard(img);
        gallerySection.addItem(newCard);
      },
    },
    ".gallery"
  );
  gallerySection.renderItems();
};

const generateSection = async () => {
  const currentUser = await profile.fetchUserData();
  api
    .getInitialCards()
    .then(async (data) => {
      renderSection(data, currentUser);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

generateSection();

const handleCardDelete = async (card, cardData) => {
  console.log(card, cardData);
  if (cardData.owner["_id"] === myProfile["_id"]) {
    api.deleteCard(cardData.id);
    card.remove();
  }
};

const popupProf = new PopupWithForm(".popup_click_prof", processProfile);
const popupCard = new PopupWithForm(".popup_click_card", processCard);
const popupImg = new PopupWithImage(".popup_click_img");
const popupDelete = new PopupWithConfirmation(
  ".popup_click_delete",
  handleCardDelete
);
const popupEditAvatar = new PopupWithForm(
  ".popup_click_avatar",
  processEditAvatar
);

export const openDeletePopup = (card, cardData) => {
  popupDelete.open(card, cardData);
};

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
  popupProf.isLoading("Сохранение...");
  api
    .editProfile({
      name: formValues[inputName.name],
      about: formValues[inputJob.name],
    })
    .finally(() => {
      popupProf.isLoading();
    });
  profile.setUserInfoForm({
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
  popupCard.isLoading("Сохранение...");
  api
    .addNewCard({ name: formValues.name, link: formValues["img-link"] })
    .then((data) => {
      gallerySection?.addItem(createCard({ id: data["_id"], ...data }));
      generateSection();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupCard.isLoading();
    });
}

const avatarButton = document.querySelector(".profile__avatar-container");

const openEditAvatar = () => {
  popupEditAvatar.open();
};

function processEditAvatar(formValues) {
  popupEditAvatar.isLoading("Сохранение...");
  api
    .editAvatar({ avatar: formValues["avatar-link"] })
    .then(() => {
      document
        .querySelector(".profile__avatar")
        .setAttribute("src", formValues["avatar-link"]);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEditAvatar.isLoading();
    });
}

avatarButton.addEventListener("click", openEditAvatar);
editButton.addEventListener("click", openProf); //для открытия
addButton.addEventListener("click", openCard); //для открытия
