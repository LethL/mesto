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

    setUserInfo(profileNameInput, profileAboutInput) {
        this._name.textContent = profileNameInput.value
        this._info.textContent = profileAboutInput.value;
    }
}