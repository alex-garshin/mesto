import { PopupWithForm } from "./PopupWithForm";

export class PopupWithConfirmation extends PopupWithForm {
  constructor(selector, handleFormSubmit) {
    super(selector, handleFormSubmit);
    this._processSubmit = (evt) => {
      evt.preventDefault();
      handleFormSubmit(this._card, this._cardId).then(() => {
        this.close();
      });
    };
  }

  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
    this._card = null;
  }
}
