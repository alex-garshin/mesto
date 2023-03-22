import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImg = this._popupType.querySelector(".popup__img");
    this._popupText = this._popupType.querySelector(".popup__text");
  }

  open(name, link) {
    this._popupImg.setAttribute("alt", name);
    this._popupImg.setAttribute("src", link);
    this._popupText.textContent = name;
    super.open();
  }
}
