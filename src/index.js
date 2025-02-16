import './pages/index.css';
import { handleLikeCard, createCard } from './components/card.js';
import { openModal, closeModal, handleCloseModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getProfileAPI, getCardsAPI, sendProfileAPI, sendNewCardAPI, sendAvatarAPI, deleteCardAPI } from './components/api.js';

const container = document.querySelector('.places__list');
const editProfile = document.querySelector('.profile__edit-button');
const addPlace = document.querySelector('.profile__add-button');
const formEdit = document.forms.edit_profile;
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const formAdd = document.forms.new_place;
const formAvatar = document.forms.avatar;
const formAvatarImg = formAvatar.elements.avatar;
const placeName = formAdd.elements.place_name;
const placeLink = formAdd.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");
const modalImageText = document.querySelector('.popup__caption');
const modalImageSrc = document.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close');

const modalNewCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalImage = document.querySelector('.popup_type_image');
const modalAvatar = document.querySelector('.popup_type_avatar')

export function deleteCard (evt, cardID) {
  const cardElement = evt.target.closest('.card');
  deleteCardAPI(cardID)
  .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM после успешного удаления с сервера
  })
  .catch((err) => {
      console.error(`Ошибка удаления карточки: ${err}`);
  });
};

// Для кнопки
function renderLoading (isLoading, button, newText = "Сохранение...", baseText = "Сохранить") {
  if (isLoading) {
      button.textContent = newText;
    }
    else {
      button.textContent = baseText;
    }
}

// слушатели для открытия попапов
editProfile.addEventListener('click', handleOpenModalEdit);
addPlace.addEventListener('click', handleOpenModalAddPlace);
profileImage.addEventListener('click', handleOpenModalAvatar);


// функции для аватара
function handleOpenModalAvatar() {
  clearValidation(modalAvatar, validationConfig);
  openModal(modalAvatar);
};

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  const newText = "Сохранение...";
  const submitButtonLoading = evt.submitter;
  const baseText = submitButtonLoading.textContent;
  renderLoading (true, submitButtonLoading, newText, baseText);

  const avatar = formAvatarImg.value;

  return sendAvatarAPI(avatar)
  .then((dataAvatar) => {
    console.log(dataAvatar)
    profileImage.setAttribute(
      "style",
      `background-image: url('${dataAvatar.avatar}')`)
    handleOpenModalAvatar();
    formAvatar.reset();
    closeModal(modalAvatar);
})
.catch((err) => {
    console.error(`Ошибка ${err}`);
})
.finally(() => {
    renderLoading (false, submitButtonLoading, newText, baseText);
});
};

formAvatar.addEventListener('submit', handleFormSubmitAvatar);

// функции для профиля
function handleOpenModalEdit() {
    clearValidation(modalEditProfile, validationConfig);
    openModal(modalEditProfile);
    formEditName.value = profileTitle.textContent;
    formEditDescription.value = profileDescription.textContent;
};

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    const newText = "Сохранение...";
    const submitButtonLoading = evt.submitter;
    const baseText = submitButtonLoading.textContent;
    renderLoading (true, submitButtonLoading, newText, baseText);
  
    const name = formEditName.value;
    const about = formEditDescription.value;

    return sendProfileAPI(name, about)
    .then((dataProfile) => {
        profileTitle.textContent = dataProfile.name;
        profileDescription.textContent = dataProfile.about;
        handleOpenModalEdit();
        formEdit.reset();
        closeModal(modalEditProfile);
    })
    .catch((err) => {
        console.error(`Ошибка ${err}`);
   })
   .finally(() => {
        renderLoading (false, submitButtonLoading, newText, baseText);
   });
};

formEdit.addEventListener('submit', handleFormSubmitProfile); 

// функции для карточек
function handleOpenModalAddPlace () {
    clearValidation(modalNewCard,validationConfig);
    openModal(modalNewCard);
};

function handleFormSubmitNewplace(evt) {
    evt.preventDefault();

    const newText = "Сохранение...";
    const submitButtonLoading = evt.submitter;
    const baseText = submitButtonLoading.textContent;
    renderLoading (true, submitButtonLoading, newText, baseText);

    const name = placeName.value;
    const link = placeLink.value;

    return sendNewCardAPI(name, link)
    .then((card) => {
        const newCard = createCard(card, deleteCard, handleOpenModalImage, handleLikeCard, userId);
        container.prepend(newCard);
        formAdd.reset();
        closeModal(modalNewCard);
    })
    .catch((err) => {
        console.error(`Ошибка ${err}`);
    })
    .finally(() => {
        renderLoading (false, submitButtonLoading, newText, baseText);
    });
};

formAdd.addEventListener('submit', handleFormSubmitNewplace);

// Кнопки
closeButtons.forEach((item) => {
  item.addEventListener('click', handleCloseModal);
});

// Окно_карточка
function handleOpenModalImage (card) {
    modalImageText.textContent = card.name;
    modalImageSrc.src = card.link;
    modalImageSrc.alt = card.name;
    openModal(modalImage);
};

// Валидация
enableValidation(validationConfig);

// Информация о пользователе на странице
let userId = "";
function showUserProfile(user) {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
};

// Получение информации о пользователе и карточках
Promise.all([getProfileAPI(), getCardsAPI()])
  .then(([user, cards]) => {
    showUserProfile(user);
    showCards(cards, deleteCard, handleOpenModalImage, handleLikeCard, userId);
  })
  .catch((err) => {
    console.error(`Ошибка ${err}`);
  });

// Функция вывода карточек
function showCards(cards, deleteCard, handleOpenModalImage, handleLikeCard, userId) {
    cards.forEach(card => {
        const displayCard = createCard(card, deleteCard, handleOpenModalImage, handleLikeCard, userId);
        container.append(displayCard);
    });
};
