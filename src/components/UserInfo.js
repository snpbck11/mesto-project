export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    this.UserInfo = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src,
    };
    return this.UserInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}
