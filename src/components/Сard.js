import { api, openDeletePopup } from "../pages";

export class Card {
  constructor(pic, cardsContainerPattern, handleCardClick) {
    this._name = pic.name;
    this._link = pic.link;
    this._id = pic.id;
    this._likes = pic.likes;
    this._owner = pic.owner;
    this._isLike = pic.isLiked;
    this._isOwner = pic.isOwner;
    this._galleryCard = document
      .querySelector(cardsContainerPattern)
      .content.querySelector(".gallery__card");
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._galleryCard = this._getCardTemplate(this._galleryCard);
    this._galleryImg = this._galleryCard.querySelector(".gallery__pic");
    this._galleryLikesCounter = this._galleryCard.querySelector(
      ".gallery__like-counter"
    );
    this._galleryImg.setAttribute("alt", this._name);
    this._galleryImg.setAttribute("src", this._link);
    this._galleryLikesCounter.textContent = this._likes?.length;
    this._galleryName = this._galleryCard.querySelector(".gallery__text");
    this._galleryName.textContent = this._name;
    this._galleryDelete = this._galleryCard.querySelector(".gallery__delete");
    if (this._isOwner) {
      this._galleryDelete.classList.remove("gallery__delete_disable");
    }

    this._galleryLike = this._galleryCard.querySelector(".gallery__like");
    if (this._isLike) {
      this._galleryLike.classList.add("gallery__like_active");
    }
    this._addEventListeners();
    return this._galleryCard;
  }

  _getCardTemplate(container) {
    const galleryArray = container.cloneNode(true);
    return galleryArray;
  }

  _addEventListeners() {
    this._galleryImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._galleryDelete.addEventListener("click", () =>
      openDeletePopup(this._galleryCard, { id: this._id, owner: this._owner })
    );
    this._galleryLike.addEventListener("click", this._toggleLike);
  }

  _deleteImage = () => {
    this._galleryCard.remove();
    this._galleryCard = null;
  };

  _toggleLike = () => {
    if (this._isLike) {
      api.deleteLikeCard(this._id);
      this._galleryLikesCounter.textContent =
        Number(this._galleryLikesCounter.textContent) - 1;
    } else {
      api.likeCard(this._id);
      this._galleryLikesCounter.textContent =
        Number(this._galleryLikesCounter.textContent) + 1;
    }

    this._galleryLike.classList.toggle("gallery__like_active");
  };
}
