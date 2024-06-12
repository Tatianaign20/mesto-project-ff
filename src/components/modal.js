
export function openModal(type) {
    const modal = document.querySelector(`.popup_type_${type}`);
    modal.classList.add('popup_is-animated');
    modal.classList.add('popup_is-opened');

    const closeButton = modal.querySelector('.popup__close');

    function handleCloseButton() {
        closeModal(type);
        closeButton.removeEventListener('click', handleCloseButton);
    };
    
    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            closeModal(type);
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    
    function handleOutside () {

        const isClickInside = !!event.target.closest('.popup__content');
        if (!isClickInside) {
            closeModal(type);
            modal.removeEventListener('click', handleOutside);
        }
    };
    
    closeButton.addEventListener('click', handleCloseButton);
    document.addEventListener('keydown', handleKeyDown);
    modal.addEventListener('click', handleOutside);
};

export function closeModal (type) {
    const modal = document.querySelector(`.popup_type_${type}`);
    modal.classList.remove('popup_is-opened');
};




   