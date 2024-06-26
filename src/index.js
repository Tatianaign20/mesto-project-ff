import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, handleCloseModal } from './components/modal.js';


const container = document.querySelector('.places__list');

initialCards.forEach(cardElement => {
    const card = createCard(cardElement, deleteCard, handleOpenModalImage, likeCard);
    container.append(card);
});

const editProfile = document.querySelector('.profile__edit-button');
const addPlace = document.querySelector('.profile__add-button');
const formEdit = document.forms.edit_profile;
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const formAdd = document.forms.new_place;
const placeName = formAdd.elements.place_name;
const placeLink = formAdd.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const modalImageText = document.querySelector('.popup__caption');
const modalImageSrc = document.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close');

const modalNewCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalImage = document.querySelector('.popup_type_image');

editProfile.addEventListener('click', handleOpenModalEdit);
addPlace.addEventListener('click', handleOpenModalAddPlace);

function handleOpenModalEdit () {
    // clearValidation(modalEditProfile, validationConfig); //очистка форм валидации
    openModal(modalEditProfile);
    formEditName.value = profileTitle.textContent;
    formEditDescription.value = profileDescription.textContent;
};

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = formEditName.value;
    profileDescription.textContent = formEditDescription.value;
    closeModal(modalEditProfile);
};

formEdit.addEventListener('submit', handleFormSubmitProfile); 
    
function handleOpenModalAddPlace () {
    // clearValidation(modalNewCard, validationConfig); // очистка форм валидации
    openModal(modalNewCard);
};

function handleFormSubmitNewplace(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: placeName.value, link: placeLink.value }, deleteCard, handleOpenModalImage, likeCard);
    container.prepend(newCard);
    formAdd.reset();
    closeModal(modalNewCard);
};

formAdd.addEventListener('submit', handleFormSubmitNewplace);

function handleOpenModalImage (name,link) {
    
    modalImageText.textContent = name;
    modalImageSrc.src = link;
    modalImageSrc.alt = name;
    openModal(modalImage);
};

closeButtons.forEach((item) => {
    item.addEventListener('click', handleCloseModal);
});




// Функция - слушатель событий добавляется всем полям ввода

// const formElement = document.querySelector('.popup__form');
// const inputElement = formElement.querySelector('.popup__input');



  const enableValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  
  const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
  };
  
  const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = "";
  };
  

function isValid() {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
};

//слушатель событий добавится всем полям ввода внутри формы
  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(enableValidation.inputSelector)
    );
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };


  // проверяет каждое поле на валидность
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
      hideError(formElement, inputElement);
    }
  };

 //  блокирует кнопку, когда находит невалидные поля, и вновь активирует её, если все поля заполнены корректно
 const toggleButtonState = (inputList, buttonElement ) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled",true);
      buttonElement.classList.add(enableValidation.inactiveButtonClass);
    } else {
      buttonElement.setAttribute("disabled", false);
      buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    }
  };
  
  //Функция hasInvalidInput() проверяет поля ввода и чекбокс на наличие ошибок и возвращает true или false, основываясь на том, обнаружены ли невалидные данные.
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  isValid();
//   const clearValidation = (formElement) => {
//     const inputList = Array.from(
//       formElement.querySelectorAll(validationConfig.inputSelector),
//     );
//     const buttonElement = formElement.querySelector(
//       validationConfig.submitButtonSelector
//     );
//     buttonElement.classList.add(validationConfig.inactiveButtonClass);
//     inputList.forEach((inputElement) => {
//       hideInputError(
//         formElement,
//         inputElement,
//         validationConfig.inputErrorClass,
//         validationConfig.errorClass,
//       );
//       inputElement.setCustomValidity("");
//     });
//   };


// ОТПРАВКА на сервер
function getPosts() {
    fetch('https://mesto.nomoreparties.co')
    .then((res) => {
      return res.json();
    })
    .then((cards) => {
        initialCards.forEach(cardElement => {
            const card = createCard(cardElement, deleteCard, handleOpenModalImage, likeCard);
            container.append(card);
        });
    })
  
  }