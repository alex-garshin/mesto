export class Popup {
  constructor(selector) {
    this._popupType = document.querySelector(selector);
    this._closeBtn = this._popupType.querySelector(".popup__close");

    this._processClickUpd = (evt) => {
      this._processClick(evt);
    };
    this._processEscapeUpd = (evt) => {
      this._processEscape(evt);
    };
    this._processCloseUpd = () => {
      this.close();
    };
  }

  open() {
    this._popupType.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popupType.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._processEscapeUpd);
    this._popupType.removeEventListener("click", this._processClickUpd);
    this._closeBtn.removeEventListener("click", this._processCloseUpd);
  }

  getPopupType() {
    return this._popupType;
  }

  setEventListeners() {
    document.addEventListener("keydown", this._processEscapeUpd);
    this._popupType.addEventListener("click", this._processClickUpd);
    this._closeBtn.addEventListener("click", this._processCloseUpd);
  }

  _processEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _processClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}
