import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import {
  inputName,
  inputJob,
  editButton,
  addButton,
  formAdd,
  formEdit,
  formAvatar,
  popupValidate,
  api,
  setImages,
  avatarButton,
} from "../utils/constants.js";
import styles from "./index.css";

setImages();

let userId;
let gallerySection;
const renderSection = (data) => {
  gallerySection = new Section(
    {
      items: data.map((item) => ({
        name: item.name,
        link: item.link,
        id: item["_id"],
        likes: item.likes,
        owner: item.owner,
        isOwner: item.owner["_id"] === userId,
      })),
      renderer: (img) => {
        const newCard = createCard({ profileId: userId, ...img });
        gallerySection.addItemAppend(newCard);
      },
    },
    ".gallery"
  );
  gallerySection.renderItems();
};

const generateSection = () => {
  api
    .getInitialCards()
    .then((data) => {
      renderSection(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const profile = new UserInfo({
  name: ".profile__name",
  job: ".profile__job",
  avatar: ".profile__avatar",
});

const fetchUserData = () => {
  return api
    .getUserInfo()
    .then((data) => {
      userId = data["_id"];
      generateSection();
      profile.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      return data;
    })
    .catch((e) => {
      throw new Error("Ошибка получения данных пользователя");
    });
};

fetchUserData().catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

const handleCardDelete = (card, cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteImage();
      popupDelete.close();
    })
    .catch((e) => {
      throw new Error(e);
    });
};

const popupProf = new PopupWithForm(".popup_click_prof", processProfile);
const popupCard = new PopupWithForm(".popup_click_card", processCard);
const popupImg = new PopupWithImage(".popup_click_img");
const popupDelete = new PopupWithConfirmation(
  ".popup_click_delete",
  handleCardDelete
);
export const popupEditAvatar = new PopupWithForm(
  ".popup_click_avatar",
  editAvatar
);

function editAvatar(formValues) {
  popupEditAvatar.isLoading("Сохранение...");
  return api
    .editAvatar({ avatar: formValues?.["avatar-link"] })
    .then((data) => {
      profile.editAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      popupEditAvatar.isLoading();
    })
    .finally(() => {
      popupEditAvatar.isLoading();
    });
}

function handleChangeLikes({ type, card }) {
  if (type === "liked") {
    disLikeCard(card);
  }

  if (type === "disLiked") {
    likeCard(card);
  }
}

function likeCard(card) {
  api
    .likeCard(card._id)
    .then((data) => {
      card.changeLikesCounter(data.likes);
      card.addLike();
    })
    .catch((e) => {
      console.log(e);
    });
}

function disLikeCard(card) {
  api
    .deleteLikeCard(card._id)
    .then((data) => {
      card.changeLikesCounter(data.likes);
      card.removeLike();
    })
    .catch((e) => {
      console.log(e);
    });
}

export const openDeletePopup = (card, cardId) => {
  popupDelete.open(card, cardId);
};

const formsValidatorWrapper = () => {
  const validatorFormAdd = new FormValidator(popupValidate, formAdd);
  const validatorFormEdit = new FormValidator(popupValidate, formEdit);
  const validatorFormAvatar = new FormValidator(popupValidate, formAvatar);

  validatorFormAdd.enableValidation();
  validatorFormEdit.enableValidation();
  validatorFormAvatar.enableValidation();

  return { validatorFormAdd, validatorFormEdit, validatorFormAvatar };
};

const { validatorFormAdd, validatorFormEdit, validatorFormAvatar } =
  formsValidatorWrapper();

const openProf = () => {
  popupProf.open();
  const { name, job } = profile.getUserInfo();
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
    .then((data) => {
      const userInfo = profile.getUserInfo();
      profile.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: userInfo.avatar,
      });
      popupProf.close();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      popupProf.isLoading();
    });
}

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

function createCard(cardData) {
  return new Card(
    cardData,
    ".gallery__array",
    handleCardClick,
    handleChangeLikes
  ).generateCard();
}

function processCard(formValues) {
  popupCard.isLoading("Сохранение...");
  return api
    .addNewCard({ name: formValues.name, link: formValues["img-link"] })
    .then((data) => {
      gallerySection?.addItem(
        createCard({
          id: data["_id"],
          profileId: userId,
          ...data,
        })
      );
      popupCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupCard.isLoading();
    });
}

const openEditAvatar = () => {
  popupEditAvatar.open();
  validatorFormAvatar.toggleButtonState();
};

avatarButton.addEventListener("click", openEditAvatar);
editButton.addEventListener("click", openProf); //для открытия
addButton.addEventListener("click", openCard); //для открытия
