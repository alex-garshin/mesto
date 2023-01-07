let popup = document.querySelector(".popup"); //попап
let formpopup = document.querySelector(".popup__form"); //форма попапа
let profilename = document.querySelector(".profile__name"); //имя
let inputname = document.querySelector(".popup__input_name"); //поле ввода имени
let profilejob = document.querySelector(".profile__job"); //профессия
let inputjob = document.querySelector(".popup__input_job"); //поле ввода профессии
let editbutton = document.querySelector(".profile__edit-button"); //кнопка редактирования попапа
let closebutton = document.querySelector(".popup__close"); //кнопка закрытия попапа

let openpopup = function () {
    popup.classList.add('popup_opened');
    inputname.value = profilename.textContent;//присваивание значения
    inputjob.value = profilejob.textContent;//присваивание значения
}

let closepopup = function () {
    popup.classList.remove('popup_opened');
}

let formsubmit = (evt) => {
    evt.preventDefault(); //откат без изменений
    profilename.textContent = inputname.value; //редактирование
    profilejob.textContent = inputjob.value; //редактирование
    closepopup();
}

editbutton.addEventListener('click', openpopup); //для открытия
closebutton.addEventListener('click', closepopup); //для закрытия
formpopup.addEventListener('submit', formsubmit); //для отправки