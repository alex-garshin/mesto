import { api } from "../utils/constants";
import { popupEditAvatar } from "../pages";

export class UserInfo {
  constructor({
    profileNameSelector,
    profileJobSelector,
    profileAvatarSelector,
  }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileJobSelector = document.querySelector(profileJobSelector);
    this._profileAvatarSelector = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileName,
      profileJob: this._profileJob,
    };
  }

  setUserInfo() {
    this._profileNameSelector.textContent = this._profileName;
    this._profileJobSelector.textContent = this._profileJob;
    this._profileAvatarSelector.setAttribute("src", this._profileAvatar);
  }

  setUserInfoForm({ name, job }) {
    this._profileName = name;
    this._profileJob = job;

    this._profileNameSelector.textContent = this._profileName;
    this._profileJobSelector.textContent = this._profileJob;
  }

  editAvatar(formValues) {
    popupEditAvatar.isLoading("Сохранение...");
    return api
      .editAvatar({ avatar: formValues?.["avatar-link"] })
      .then(() => {
        document
          .querySelector(".profile__avatar")
          .setAttribute("src", formValues["avatar-link"]);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        popupEditAvatar.isLoading();
      })
      .finally(() => {
        popupEditAvatar.isLoading();
      });
  }
}
