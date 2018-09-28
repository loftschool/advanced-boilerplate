import Vue from "vue";

const info = {
  template: "#slider-info",
  props: {
    work: Object
  }
};

const display = {
  template: "#slider-display",
  props: {
    work: Object
  }
};

const btns = {
  template: "#slider-btns",
  props: {
    works: Array,
    currentIndex: Number
  },
  data() {
    return {
      prevButtonWorks: [],
      nextButtonWorks: []
    };
  },
  created() {
    this.prevButtonWorks = this.retransformWorksForButton("prev");
    this.nextButtonWorks = this.retransformWorksForButton("next");
  },
  methods: {
    retransformWorksForButton(buttonDirection) {
      const worksArray = [...this.works];
      const lastItem = worksArray[worksArray.length - 1];

      switch (buttonDirection) {
        case "prev": {
          worksArray.unshift(lastItem);
          worksArray.pop();
          break;
        }
        case "next": {
          worksArray.push(worksArray[0]);
          worksArray.shift();
          break;
        }
      }

      return worksArray;
    },
    slide(direction) {
      this.$emit("slide", direction);
    }
  }
};

new Vue({
  el: "#slider-component",
  components: { info, display, btns },
  data() {
    return {
      works: [],
      currentIndex: 0
    };
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.loopCurrentIndex(value);
    }
  },
  created() {
    const data = require("../../../data/works.json");
    this.works = data;
  },
  methods: {
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex = this.currentIndex + 1;
          break;

        case "prev":
          this.currentIndex = this.currentIndex - 1;
          break;
      }
    },
    loopCurrentIndex(currentValue) {
      const worksAmount = this.works.length - 1;
      if (currentValue > worksAmount) this.currentIndex = 0;
      if (currentValue < 0) this.currentIndex = worksAmount;
    }
  },
  template: "#slider-root"
});
