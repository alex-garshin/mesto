import { openDeletePopup } from "../pages";

export class Card {
  constructor(pic, cardsContainerPattern, handleCardClick, handleChangeLikes) {
    this._name = pic.name;
    this._link = pic.link;
    this._id = pic.id;
    this._likes = pic.likes;
    this._owner = pic.owner;
    this._profileId = pic.profileId;
    this._isLike = this._likes.find((like) => {
      return like["_id"] === this._profileId;
    });
    this._isOwner = this._owner["_id"] === this._profileId;
    this._galleryCard = document
      .querySelector(cardsContainerPattern)
      .content.querySelector(".gallery__card");
    this._handleCardClick = handleCardClick;
    this._handleChangeLikes = handleChangeLikes;
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
      openDeletePopup(this, this._id)
    );
    this._galleryLike.addEventListener("click", () =>
      this._handleChangeLikes({
        type: this._isLike ? "liked" : "disLiked",
        card: this,
      })
    );
  }

  deleteImage = (card) => {
    card.remove();
    card = null;
  };

  changeLikesCounter = (likes) => {
    this._galleryLike.classList.toggle("gallery__like_active");
    this._galleryLikesCounter.textContent = likes.length;
  };

  addLike = () => {
    this._isLike = true;
  };

  removeLike = () => {
    this._isLike = false;
  };
}
