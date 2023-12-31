import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
  profile = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings = [];
  events = [];
  loadingFollowings = false;
  loadingEvents = false;
  activeTab = 0;
  eventsActiveTab = 0;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else if (activeTab === 2 && this.events.length === 0) {
          this.loadEvents("future");
          this.followings = [];
        } else {
          this.followings = [];
        }
      }
    );

    reaction(
      () => this.eventsActiveTab,
      (eventsActiveTab) => {
        if (eventsActiveTab === 0) this.loadEvents("future");
        if (eventsActiveTab === 1) this.loadEvents("past");
        if (eventsActiveTab === 2) this.loadEvents("hosting");
      }
    );
  }

  setActiveTab = (activeTab) => {
    this.activeTab = activeTab;
  };

  setEventsActiveTab = (eventsActiveTab) => {
    this.eventsActiveTab = eventsActiveTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile)
      return store.userStore.user.username === this.profile.username;

    return false;
  }

  loadProfile = async (username) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain).isMain = false;
          this.profile.photos.find((p) => p.id === photo.id).isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };

  deletePhoto = async (photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };

  updateProfile = async (profile) => {
    try {
      let partialProfile = {
        DisplayName: profile.displayName,
        Bio: profile.bio,
      };
      await agent.Profiles.updateProfile(partialProfile);
      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = partialProfile.DisplayName;
          this.profile.bio = partialProfile.Bio;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateFollowing = async (username, following) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (
          this.profile &&
          this.profile.username === store.userStore.user?.username
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadFollowings = async (predicate) => {
    this.loadingFollowings = true;

    try {
      const followings = await agent.Profiles.listFollowings(
        this.profile.username,
        predicate
      );
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingFollowings = false;
      });
    }
  };

  loadEvents = async (predicate) => {
    this.loadingEvents = true;

    try {
      const events = await agent.Profiles.listEvents(
        this.profile.username,
        predicate
      );
      runInAction(() => {
        this.events = events;
        this.loadingEvents = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingEvents = false;
      });
    }
  };
}
