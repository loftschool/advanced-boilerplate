import Vue from "vue";

const info = {
  template: "#slider-info",
  props: {
    work: Object
  },
  methods: {
    enter(el, done) {
      const sentence = el.innerText.trim();
      const wrapped = sentence.split("").map(
        item => `
          <span class="${item === " " ? "whitespace" : ""}">${item}</span>
        `
      );

      el.innerHTML = wrapped;

      const words = Array.from(el.children);
      let i = 0;
      function animate(words) {
        const currentLetter = words[i];
        let timer = setTimeout(() => {
          animate(words);
        }, 20);

        currentLetter.classList.add("bounceIn");
        i++;

        if (i >= words.length) {
          clearTimeout(timer);
        }
      }

      animate(words);

      done();
    },
    leave(el, done) {
      el.remove();
      done();
    }
  }
};

const display = {
  template: "#slider-display",
  props: {
    work: Object
  }
};

const buttons = {
  template: "#slider-btn",
  props: {
    works: Array,
    currentIndex: Number
  },
  computed: {
    prevBtnArr() {
      const worksArray = [...this.works];
      const lastItem = worksArray[worksArray.length - 1];

      worksArray.unshift(lastItem);
      worksArray.pop();
      return [worksArray[this.currentIndex]];
    },
    nextBtnArr() {
      const worksArray = [...this.works];
      const firstItem = worksArray[0];

      worksArray.push(firstItem);
      worksArray.shift();
      return [worksArray[this.currentIndex]];
    }
  },
  methods: {
    slide(direction) {
      this.$emit("slide", direction);
    }
  }
};

new Vue({
  el: "#slider-component",
  components: {
    info,
    display,
    buttons
  },
  data: {
    works: [],
    currentIndex: 0,
    currentWork: {}
  },
  watch: {
    currentIndex(value) {
      const worksAmount = this.works.length - 1;

      if (value > worksAmount) this.currentIndex = 0;

      if (value < 0) this.currentIndex = worksAmount;

      this.currentWork = this.works[value];
    }
  },
  created() {
    this.works = require("../../../data/works.json");
    this.currentWork = this.works[0];
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
    }
  },
  template: "#slider"
});
