export class Card {
  constructor(pic, cardsContainerPattern, handleCardClick) {
    this._name = pic.name;
    this._link = pic.link;
    this._galleryCard = document
      .querySelector(cardsContainerPattern)
      .content.querySelector(".gallery__card");
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._galleryCard = this._pushGalleryArray(this._galleryCard);
    this._galleryImg = this._galleryCard.querySelector(".gallery__pic");
    this._galleryImg.setAttribute("alt", this._name);
    this._galleryImg.setAttribute("src", this._link);
    this._galleryName = this._galleryCard.querySelector(".gallery__text");
    this._galleryName.textContent = this._name;
    this._galleryDelete = this._galleryCard.querySelector(".gallery__delete");
    this._galleryLike = this._galleryCard.querySelector(".gallery__like");
    this._addEventListeners();
    return this._galleryCard;
  }

  _pushGalleryArray(container) {
    const galleryArray = container.cloneNode(true);
    return galleryArray;
  }

  _addEventListeners() {
    this._galleryImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._galleryDelete.addEventListener("click", this._deleteImage);
    this._galleryLike.addEventListener("click", this._likeImage);
  }

  _deleteImage = () => {
    this._galleryCard.remove();
    this._galleryCard = null;
  };

  _likeImage = () => {
    this._galleryLike.classList.toggle("gallery__like_active");
  };
}
