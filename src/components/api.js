import { checkResponse } from "./utils.js";

// Конфигурация для запросов
export const requestConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: 'c29acbcd-e400-4694-90fd-37fde0fe5a19',
    'Content-Type': 'application/json'
  }
};

// Функция запроса
const request = (endpoint, options) => {
  return fetch(`${requestConfig.baseUrl}${endpoint}`, options).then(checkResponse);
}

// Запрос на изменение имени и профессии
export const setProfileAbout = (nameInput, aboutInput) => {
 return request('/users/me', {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput
   })
  })
};

// Запрос на получение данных профиля 
export const getProfileAbout = () => {
  return request('/users/me', {
    method: 'GET',
    headers: requestConfig.headers
  })
};

// Запрос на заполнение галереи карточками
export const getProfileCards = () => {
  return request('/cards', {
    method: 'GET',
    headers: requestConfig.headers
  })
};

// Запрос на добалвение карточки
export const addCardRequest = (nameInput, linkInput) => {
  return request('/cards', {
    method: 'POST',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: nameInput,
      link: linkInput
    })
  })
};

// Поставить лайк
export const setLikeRequest = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: requestConfig.headers
  })
};

// Снять лайк
export const removeLikeRequest = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: requestConfig.headers
  })
};

// Удаление карточки
export const removeCard = (cardId) => {
  return request(`/cards/${cardId}`,  {
    method: 'DELETE',
    headers: requestConfig.headers
  })
};

// Обновление аватара
export const changeAvatar = (linkInput) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar: linkInput
    })
  });
}