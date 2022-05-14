export default class Api {
    constructor(option) {
        this._url = option.url;
        this._headers = option.headers;
    }

    getInitialCards() {
        return fetch(this._url, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}