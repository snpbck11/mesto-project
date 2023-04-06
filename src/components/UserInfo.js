export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    this.name = this._profileName.textContent;
    this.about = this._profileAbout.textContent;
    this.avatar = this._profileAvatar.src;

    this.UserInfo = {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
    };
    return this.UserInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}
