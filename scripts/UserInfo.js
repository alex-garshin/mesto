export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
