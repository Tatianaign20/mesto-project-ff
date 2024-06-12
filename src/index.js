import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeEvent } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const container = document.querySelector('.places__list');

initialCards.forEach(cardElement => {
    const card = createCard(cardElement, deleteCard, handleOpenModalImage, likeEvent);
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

editProfile.addEventListener('click', handleOpenModalEdit);
addPlace.addEventListener('click', handleOpenModalAddPlace);

function handleOpenModalEdit () {
    openModal('edit');
    formEditName.value = document.querySelector('.profile__title').textContent;
    formEditDescription.value = document.querySelector('.profile__description').textContent;
};

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = formEditName.value;
    document.querySelector('.profile__description').textContent = formEditDescription.value;
    closeModal('edit');
};

formEdit.addEventListener('submit', handleFormSubmitProfile); 
    
function handleOpenModalAddPlace () {
    openModal('new-card');
};

function handleFormSubmitNewplace(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: placeName.value, link: placeLink.value }, deleteCard, handleOpenModalImage, likeEvent);
    container.prepend(newCard);
    formAdd.reset();
    closeModal ('new-card');
};

formAdd.addEventListener('submit', handleFormSubmitNewplace);

function handleOpenModalImage (name,link) {
    openModal('image');
    const modalImageText = document.querySelector('.popup__caption');
    modalImageText.textContent = name;
    const modalImageSrc = document.querySelector('.popup__image');
    modalImageSrc.src = link;
};



