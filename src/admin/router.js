import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "./requests";

Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

import skills from "./components/skills.vue";
import header from "./components/header.vue";
import tabs from "./components/tabs.vue";
import works from "./components/works.vue";

const routes = [
  {
    path: "/",
    components: {
      default: skills,
      header: header,
      tabs: tabs
    }
  },
  {
    path: "/works",
    components: {
      default: works,
      header: header,
      tabs: tabs
    }
  }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  axios
    .get("/user")
    .then(response => {
      // next();
    })
    .catch(error => {
      console.log("error in router");
      // localStorage.removeItem("token");
      // window.location.href = "//google.com";
    });

  next();
});

export default router;
