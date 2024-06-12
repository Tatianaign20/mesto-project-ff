

export function createCard ({ name, link }, deleteCard, handleOpenModalImage, likeEvent) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__image').addEventListener('click', function() {
        handleOpenModalImage(name,link)
    });
    
    cardElement.querySelector('.card__like-button').addEventListener('click', likeEvent);
    return cardElement;
};

export function likeEvent(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteCard (evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};