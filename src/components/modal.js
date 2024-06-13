
export const modal= document.querySelector('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

export function openModal(modal) {
    modal.classList.add('popup_is-animated');
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKeyDown);
    modal.addEventListener('click', handleOutside);
    closeButtons.forEach((item) => {
        item.addEventListener('click', () => {
                closeModal(modal);
        });
    });
    };

function handleKeyDown(event) {
    if (event.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpen);
    }
};
    
function handleOutside () {
    const isClickInside = !!event.target.closest('.popup__content');   //Добрый! В задании нет обязательных требований к реализации по данному пункту.
    if (!isClickInside) {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpen);
    }
};

export function closeModal (modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('click', handleOutside);
    document.removeEventListener('keydown', handleKeyDown);
    closeButtons.forEach((item) => {
        item.removeEventListener('click', () => {
                closeModal(modal);
        });
    });
};





   