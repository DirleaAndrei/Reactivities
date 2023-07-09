import axios from "axios";

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5002/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
});

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => request.get("/activities"),
  details: (id) => request.get(`/activities/${id}`),
  create: (activity) => request.post(`/activities`, activity),
  update: (activity) => request.put(`/activities/${activity.id}`, activity),
  delete: (id) => request.del(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
