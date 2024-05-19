// @todo: Темплейт карточки
const container = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard ({name, link}) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
    };

// @todo: Функция удаления карточки

function deleteCard (evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
    };

// @todo: Вывести карточки на страницу

initialCards.forEach(cardElement => {
    const card = createCard(cardElement);
    container.append(card);
    });

