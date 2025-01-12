
const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-17/";

//обработка ответа сервера
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    throw new Error('Ошибка!');
  }
};

const apiURLpart = {
  user: "users/me",
  cards: "cards",
  likes: "cards/likes"
};

const headers = {
  Authorization: "b6e7dc81-0f1c-49fc-b4a4-e7099bace48e",
  "Content-Type": "application/json"
};

const getProfileAPI = () => {
  const userURL = BASE_URL + `${apiURLpart.user}`;
  return fetch(userURL, {
    method: "GET",
    headers
  })
  .then(handleResponse)
};

const sendProfileAPI = (name, about) => {
  const userURL = BASE_URL + `${apiURLpart.user}`;
  return fetch(userURL, {
    method: "PATCH",
    body: JSON.stringify({
      name,
      about
    }),
    headers
  })
  .then(handleResponse)
};

const sendAvatarAPI = (avatar) => {
  const userAvatarURL = BASE_URL + `${apiURLpart.user}/avatar`;
  return fetch(userAvatarURL, {
    method: "PATCH",
    body: JSON.stringify({
      avatar 
    }),
    headers
  })
  .then(handleResponse)
};

const getCardsAPI = () => {
  const cardsURL = BASE_URL + `${apiURLpart.cards}`;
  return fetch(cardsURL, {
    method: "GET",
    headers
  })
  .then(handleResponse)
};

const sendNewCardAPI = (name, link) => {
  const cardsURL = BASE_URL + `${apiURLpart.cards}`;
  return fetch(cardsURL, {
    method: "POST",
    body: JSON.stringify({
      name,
      link
    }),
    headers
  })
  .then(handleResponse)
};

export const deleteCardAPI = (id) => {
  const cardsURL = BASE_URL + `${apiURLpart.cards}/${id}`;
  return fetch(cardsURL, {
    method: "DELETE",
    headers
  })
  .then(handleResponse)
};

const likeCardAPI = (id) => {
  const likesURL = BASE_URL + `${apiURLpart.likes}/${id}`; 
  return fetch(likesURL, {
    method: "PUT",
    headers
  })
  .then(handleResponse)
}
const delLikeCardAPI = (id) => {
  const likesURL = BASE_URL + `${apiURLpart.likes}/${id}`; 
  return fetch(likesURL, {
    method: "DELETE",
    headers
  })
  .then(handleResponse)
};


export { getProfileAPI, getCardsAPI, sendProfileAPI, sendNewCardAPI, likeCardAPI, delLikeCardAPI, sendAvatarAPI }

