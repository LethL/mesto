export default class UserInfo {
    constructor(name, about, avatar) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo() {
        this._data = {
            name: this._name.textContent,
            about: this._about.textContent
        }
      
        return this._data
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this.setUserAvatar(data);
        this._avatar.alt = `${data.name} avatar`;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar
      }
}