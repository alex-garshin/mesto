export class UserInfo {
  constructor({ name, job, avatar, id }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
    this._id = id;
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.getAttribute("src"),
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.setAttribute("src", avatar);
  }

  editAvatar(avatarLink) {
    this._avatar.setAttribute("src", avatarLink);
  }
}
