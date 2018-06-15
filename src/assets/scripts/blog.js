import Vue from "vue";

const A = {
  template: "#component-a"
};

const B = {
  template: "#component-b"
};

new Vue({
  el: "#animation-root",
  components: {
    compA: A,
    compB: B
  },
  data() {
    return {
      show: true,
      currentComponent: "compA"
    };
  },
  template: "#animation"
});
