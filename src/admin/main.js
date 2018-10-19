import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axiosRequests from './requests'

store.$axios = axiosRequests;

const app = new Vue({
  el: "#admin-app",
  store,
  router,
  render: h => h(App)
});
