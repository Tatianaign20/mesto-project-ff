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
    openModal(modalImage);
    modalImageText.textContent = name;
    modalImageSrc.src = link;
    modalImageSrc.alt = name;
};

closeButtons.forEach((item) => {
    item.addEventListener('click', handleCloseModal);
});


