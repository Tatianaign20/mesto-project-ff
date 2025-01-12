import { likeCardAPI, delLikeCardAPI } from './api.js';

function getCardTemplate () {
    const cardTemlate = document.querySelector('#card-template').content;
    const cardElementClone = cardTemlate.querySelector('.places__item').cloneNode(true);
    return cardElementClone;
};

export function handleLikeCard (card, cardLikeButton, likeCounter) {
    if(cardLikeButton.classList.contains('card__like-button_is-active')) {
        delLikeCardAPI(card._id)
        .then((updateLike) => {
             cardLikeButton.classList.remove('card__like-button_is-active');
             likeCounter.textContent = updateLike.likes.length;
        })
        .catch((err) => {
            console.error(`Ошибка ${err}`);
        });
    } 
    else {
        likeCardAPI(card._id)
        .then((updateLike) => {
            cardLikeButton.classList.add('card__like-button_is-active');
            likeCounter.textContent = updateLike.likes.length;
        })
        .catch((err) => {
            console.error(`Ошибка ${err}`);
        });
    }
};
   
export function createCard (card, deleteCard, handleOpenModalImage, handleLikeCard, userId ) {
    const cardElement = getCardTemplate ();
    const cardElementImage = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title');
    cardElementImage.src = card.link;
    cardElementImage.alt = card.name;
        // Добавляем обработчик ошибки загрузки изображения
    cardElementImage.onerror = function() {
        // Если произошла ошибка при загрузке изображения,
        // удаляем элемент-карточку целиком
    cardElement.remove();
    };
    cardElementTitle.textContent = card.name;
    const likeCounter = cardElement.querySelector('.like_count');
    likeCounter.textContent = card.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id === userId) {
        deleteButton.addEventListener('click', (evt) => {
          deleteCard(evt, card._id);
        });
    }
    else {
        deleteButton.remove();
    };
    
    cardElementImage.addEventListener('click', () => {
        handleOpenModalImage(card)
    });

    // Слушатель на кнопку лайка
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => {
    handleLikeCard(card, cardLikeButton, likeCounter);
    });

 // Проверка наличия лайка пользователя в массиве likes
    const isLiked = card.likes.some((like) => like._id === userId);
    if (isLiked) {
     cardLikeButton.classList.add('card__like-button_is-active');
    };

    return cardElement;
};

export function deleteCard (evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};
