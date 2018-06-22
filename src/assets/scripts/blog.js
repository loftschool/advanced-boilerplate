import Vue from "vue";

const compA = {
  template: "#compA"
};

const compB = {
  template: "#compB"
};

new Vue({
  el: "#animation-root",
  components: {
    compA,
    compB
  },
  data: {
    title: "Hello World",
    arr: [1, 2, 3, 4, 5, 6, 7, 8],
    compToShow: "compA"
  },
  methods: {
    addNewItem() {
      this.arr.shift();
      this.arr.push(this.arr[this.arr.length - 1] + 1);
    },
    switchComps() {
      this.compToShow = this.compToShow === "compA" ? "compB" : "compA";
    }
  },
  template: "#animation"
});
