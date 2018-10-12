import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

import skills from "./components/skills.vue";
import works from "./components/works.vue";
import header from "./components/header.vue";
import tabs from "./components/tabs.vue";

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

const guard = axios.create({
  baseURL: "http://localhost:8000/"
});

router.beforeEach((to, from, next) => {
  guard
    .get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      next();
    })
    .catch(error => {
      localStorage.removeItem("token");
      window.location.href = "//google.com";
    });
});

export default router;
