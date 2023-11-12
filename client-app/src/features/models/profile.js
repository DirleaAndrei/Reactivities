export class Profile {
  username = "";
  displayName = "";
  bio = null;
  image = "";
  photos = [];
  followersCount = 0;
  followingCount = 0;
  following = false;

  constructor(user) {
    if (user) {
      this.username = user.username;
      this.displayName = user.displayName;
      this.bio = null;
      this.image = user.image;
      this.photos = user.photos;
      this.followersCount = user.followersCount;
      this.followingCount = user.followingCount;
      this.following = user.following;
    }
  }
}
