export class Profile {
  username = "";
  displayName = "";
  bio = null;
  image = "";

  constructor(user) {
    if (user) {
      this.username = user.username;
      this.displayName = user.displayName;
      this.bio = null;
      this.image = user.image;
    }
  }
}
