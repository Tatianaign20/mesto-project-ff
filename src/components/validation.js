// Функция - слушатель событий добавляется всем полям ввода

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  
  const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  };
  

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
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
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
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
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
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
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", false);
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  //Функция hasInvalidInput() проверяет поля ввода и чекбокс на наличие ошибок и возвращает true или false, основываясь на том, обнаружены ли невалидные данные.
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const clearValidation = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector),
    );
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    buttonElement.setAttribute("disabled",true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);

    inputList.forEach((inputElement) => {
      hideError(formElement,inputElement);
      inputElement.setCustomValidity("");
    });
  };

  export { validationConfig, enableValidation, clearValidation }