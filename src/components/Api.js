export default class Api {
    constructor(option) {
        this._url = option.url;
        this._headers = option.headers;
    }

    _responseHandler(res) {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._responseHandler(res)
        })
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._responseHandler(res)
        })
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            return this._responseHandler(res)
        })
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this._responseHandler(res)
        })
    }
}