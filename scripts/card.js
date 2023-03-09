import { openPopup, popupImg, popupImages, popupText } from "./index.js";

export class Card {
  constructor(pic, cardsContainerPattern) {
    this._name = pic.name;
    this._link = pic.link;
    this._galleryCardArray = document
      .querySelector(cardsContainerPattern)
      .content.querySelector(".gallery__card");
  }

  generateCard() {
    this._galleryCardArray = this._pushGalleryArray(this._galleryCardArray);
    this._galleryImg = this._galleryCardArray.querySelector(".gallery__pic");
    this._galleryImg.setAttribute("alt", this._name);
    this._galleryImg.setAttribute("src", this._link);
    this._galleryName = this._galleryCardArray.querySelector(".gallery__text");
    this._galleryName.textContent = this._name;
    this._galleryDelete =
      this._galleryCardArray.querySelector(".gallery__delete");
    this._galleryLike = this._galleryCardArray.querySelector(".gallery__like");
    this._addEventListeners();
    return this._galleryCardArray;
  }

  _fillCard = (name, link) => {
    openPopup(popupImg);
    popupImages.setAttribute("alt", name);
    popupImages.setAttribute("src", link);
    popupText.textContent = name;
  };

  _pushGalleryArray(container) {
    const galleryArray = container.cloneNode(true);
    return galleryArray;
  }

  _addEventListeners() {
    this._galleryImg.addEventListener("click", () => {
      this._fillCard(this._name, this._link);
    });
    this._galleryDelete.addEventListener("click", this._deleteImage);
    this._galleryLike.addEventListener("click", this._likeImage);
  }

  _deleteImage = (event) => {
    event.target.closest(".gallery__card").remove();
  };

  _likeImage = (event) => {
    event.target.classList.toggle("gallery__like_active");
  };
}
