export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  _getCheck(res) {
    return res.ok ? res.json() : Promise.reject(`ошибка : ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getCheck(res, "массив картинок"));
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getCheck(res, "информация о пользователе"));
  }

  editProfile({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getCheck(res, "изменить профиль"));
  }

  editAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._getCheck(res, "изменеть аватар"));
  }

  addNewCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getCheck(res, "добавить изображение"));
  }

  likeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getCheck(res, "поставить лайк"));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getCheck(res, "удалить изображение"));
  }

  deleteLikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getCheck(res, "снять лайк"));
  }
}
