import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { router } from "../router/Route";
import { store } from "./store";

export default class UserStore {
  user = null;
  fbLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  register = async (creds) => {
    const user = await agent.Account.register(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  setImage = (image) => {
    if (this.user) this.user.image = image;
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setDisplayName = (displayName) => {
    this.user.displayName = displayName;
  };

  facebookLogin = async (accessToken) => {
    try {
      this.fbLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
        this.fbLoading = false;
      });
      router.navigate("/activities");
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.fbLoading = false;
      });
    }
  };
}
