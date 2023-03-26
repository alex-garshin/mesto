import { api } from "../pages";

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

  fetchUserData = () => {
    return api
      .getUserInfo()
      .then((data) => {
        this._profileName = data.name;
        this._profileJob = data.about;
        this._profileAvatar = data.avatar;

        return data;
      })
      .catch((e) => {
        throw new Error("Ошибка получения данных пользователя");
      });
  };

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
}
