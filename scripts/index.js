let popup = document.querySelector(".popup"); //попап
let formPopup = document.querySelector(".popup__form"); //форма попапа
let profileName = document.querySelector(".profile__name"); //имя
let inputName = document.querySelector(".popup__input_click_name"); //поле ввода имени
let profileJob = document.querySelector(".profile__job"); //профессия
let inputJob = document.querySelector(".popup__input_click_job"); //поле ввода профессии
let editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования попапа
let closeButton = document.querySelector(".popup__close"); //кнопка закрытия попапа

let openPopup = function () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;//присваивание значения
    inputJob.value = profileJob.textContent;//присваивание значения
}

let closePopup = function () {
    popup.classList.remove('popup_opened');
}

let formSubmit = (evt) => {
    evt.preventDefault(); //откат без изменений
    profileName.textContent = inputName.value; //редактирование
    profileJob.textContent = inputJob.value; //редактирование
    closePopup();
}

editButton.addEventListener('click', openPopup); //для открытия
closeButton.addEventListener('click', closePopup); //для закрытия
formPopup.addEventListener('submit', formSubmit); //для отправки