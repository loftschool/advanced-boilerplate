import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "axios";
import router from "./router";

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
    console.log(originalRequest);
    // console.log(
    //   "gh",
    //   error.config,
    //   error.response,
    //   error.response.status === 401
    // );
    if (DateNow + 10 > ttl) {
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

            store.dispatch("getUserInfo");
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

store.$axios = axios;

const app = new Vue({
  el: "#admin-app",
  store,
  router,
  render: h => h(App)
});
