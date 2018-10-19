import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

const guard = axios.create({
  baseURL: "http://localhost:8000"
});

import skills from './components/skills.vue';
import works from './components/works.vue';

const routes = [
  {
    path: '/',
    component: skills
  },
  {
    path: '/works',
    component: works
  }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  // guard
  //   .get("/user", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     }
  //   })
  //   .then(response => {
  //     // next();
  //   })
  //   .catch(error => {
  //     // localStorage.removeItem("token");
  //     // window.location.href = "http://google.com";
  //   });
  next();
});

export default router;
