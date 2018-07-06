import axios from "axios";
import store from "./store";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

axios.interceptors.response.use(
  response => {
    console.log("response in interceptor", response);
    return response;
  },
  error => {
    const ttl = parseInt(localStorage.getItem("ttl"));
    const DateNow = Math.floor(Date.now() / 1000);
    const originalRequest = error.config;
    console.log("токен ошибка", DateNow, ttl, DateNow + 10 > ttl);
    console.log("originalRequest", error.config);
    console.log("cancell", axios.isCancel());
    if (DateNow > ttl && error.response.status === 401) {
      console.log("токен протух");
      axios
        .post("/refreshToken")
        .then(
          response => {
            console.log("ответ при рефреше", response);
            const token = response.data.token;
            const ttl = Math.floor(Date.now() / 1000 + response.data.ttl);
            localStorage.setItem("token", token);
            localStorage.setItem("ttl", ttl);
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            originalRequest.headers["Authorization"] = `Bearer ${token}`;

            // store.dispatch("getUserInfo");
            return axios(originalRequest);
          },
          error => {
            console.log("propm", error);
          }
        )
        .catch(e => {
          console.log("errorro", e);
        });
    }

    return Promise.reject(error);
  }
);

export default axios;
