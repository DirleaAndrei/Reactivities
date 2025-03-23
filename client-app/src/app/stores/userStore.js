import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { router } from "../router/Route";
import { store } from "./store";
import { toast } from "react-toastify";

export default class UserStore {
  user = null;
  fbLoading = false;
  refreshTokenTimeout = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    this.#startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  register = async (creds) => {
    await agent.Account.register(creds);
    router.navigate(`/account/registerSuccess?email=${creds.email}`);
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
      store.commonStore.setToken(user.token);
      this.#startRefreshTokenTimer(user);
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
      this.#startRefreshTokenTimer(user);
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

  refreshToken = async () => {
    this.#stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      store.commonStore.setToken(user.token);
      this.#startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  #startRefreshTokenTimer(user) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  #stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  forgotPassword = async (email) => {
    const response = await agent.Account.forgotPassword(email);
    toast.success(response);
    store.modalStore.closeModal();
  }
}
