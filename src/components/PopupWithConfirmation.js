import { PopupWithForm } from "./PopupWithForm";

export class PopupWithConfirmation extends PopupWithForm {
  constructor(selector, handleFormSubmit) {
    super(selector, handleFormSubmit);
    this._processSubmit = (evt) => {
      evt.preventDefault();
      handleFormSubmit(this._card, this._cardData).then(() => {
        this.close();
      });
    };
  }

  open(card, cardData) {
    this._card = card;
    this._cardData = cardData;
    super.open();
  }

  close() {
    super.close();
    this._card = null;
  }
}
