export default class UserInfo {
    constructor(name, info) {
        this._name = name
        this._info = info
    }

    getUserInfo() {
        this._data = {
            name: this._name.textContent,
            info: this._info.textContent
        }
      
        return this._data
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.info;
    }
}