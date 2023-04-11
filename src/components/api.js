export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this.url}${endpoint}`, options).then(this._checkResponse);
  }

  setProfileAbout(nameInput, aboutInput) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameInput,
        about: aboutInput,
      }),
    });
  }

  getProfileAbout() {
    return this._request("/users/me", {
      method: "GET",
      headers: this.headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      method: "GET",
      headers: this.headers,
    });
  }

  addCardRequest(nameInput, linkInput) {
    return this._request("/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameInput,
        link: linkInput,
      }),
    });
  }

  setLikeRequest(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLikeRequest(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeAvatar(linkInput) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: linkInput,
      }),
    });
  }
}
