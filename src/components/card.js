

function getCardTemplate () {
    const cardTemlate = document.querySelector('#card-template').content;
    const cardElementClone = cardTemlate.querySelector('.places__item').cloneNode(true);
    return cardElementClone;
};
   
export function createCard ({ name, link }, deleteCard, handleOpenModalImage, likeCard ) {
    const cardElement = getCardTemplate ();
    // const cardTemlate = document.querySelector('#card-template').content;   Вынесли за пределы функции функционал клонирования
    // const cardElement = cardTemlate.querySelector('.places__item').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = link;
    cardElementImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElementImage.addEventListener('click', function() {
        handleOpenModalImage(name,link)
    });
    
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    return cardElement;
};


export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteCard (evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};