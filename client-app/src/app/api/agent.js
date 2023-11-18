import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Route";
import { store } from "../stores/store";
import { PaginatedResults } from "../../features/models/pagination";

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5002/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResults(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error) => {
    const { data, status, config } = error.response;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        )
          router.navigate("/not-found");
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else toast.error(data);
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: (params) => axios.get("/activities", { params }).then(responseBody),
  details: (id) => requests.get(`/activities/${id}`),
  create: (activity) => requests.post(`/activities`, activity),
  update: (activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id) => requests.del(`/activities/${id}`),
  attend: (id) => requests.post(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get("/account"),
  login: (user) => requests.post("/account/login", user),
  register: (user) => requests.post("/account/register", user),
};

const Profiles = {
  get: (username) => requests.get(`/profiles/${username}`),
  uploadPhoto: (file) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id) => requests.del(`/photos/${id}`),
  updateProfile: (profileDto) => requests.put(`/profiles`, profileDto),
  updateFollowing: (username) => requests.post(`/follow/${username}`, {}),
  listFollowings: (username, predicate) =>
    requests.get(`/follow/${username}?predicate=${predicate}`),
};

const agent = {
  Activities,
  Account,
  Profiles,
};

export default agent;
