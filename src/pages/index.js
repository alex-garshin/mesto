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
        profileId: profile["_id"],
        isOwner: item.owner["_id"] === profile["_id"],
      })),
      renderer: (img) => {
        const newCard = createCard(img);
        gallerySection.addItemAppend(newCard);
      },
    },
    ".gallery"
  );
  gallerySection.renderItems();
};

const generateSection = (user) => {
  api
    .getInitialCards()
    .then((data) => {
      renderSection(data, user);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const profile = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  profileAvatarSelector: ".profile__avatar",
});

const fetchUserData = () => {
  return api
    .getUserInfo()
    .then((data) => {
      profile._profileName = data.name;
      profile._profileJob = data.about;
      profile._profileAvatar = data.avatar;

      return data;
    })
    .catch((e) => {
      throw new Error("Ошибка получения данных пользователя");
    });
};

let myProfile;
fetchUserData()
  .then((data) => {
    generateSection(data);
    profile.setUserInfo();
    myProfile = data;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const handleCardDelete = (card, cardData) => {
  return api
    .deleteCard(cardData.id)
    .then(() => {
      card.remove();
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
  profile.editAvatar
);

export const openDeletePopup = (card, cardData) => {
  popupDelete.open(card, cardData);
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
  return api
    .editProfile({
      name: formValues[inputName.name],
      about: formValues[inputJob.name],
    })
    .then(() => {
      profile.setUserInfoForm({
        name: formValues[inputName.name],
        job: formValues[inputJob.name],
      });
    })
    .catch(() => {
      popupProf.isLoading();
    })
    .finally(() => {
      popupProf.isLoading();
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
  return api
    .addNewCard({ name: formValues.name, link: formValues["img-link"] })
    .then((data) => {
      gallerySection?.addItem(
        createCard({
          id: data["_id"],
          profileId: myProfile["_id"],
          ...data,
        })
      );
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      popupCard.isLoading();
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
