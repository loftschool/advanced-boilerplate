import Vue from "vue";

const skill = {
  template: "#skill",
  props: {
    name: String,
    percentage: Number
  },
  mounted() {
    const circle = this.$refs["circle"];
    const percent = parseInt(
      getComputedStyle(circle).getPropertyValue("stroke-dashoffset")
    );

    const requiredDashoffset = (percent / 100) * (100 - this.percentage);

    circle.style.strokeDashoffset = requiredDashoffset;
  }
};

const skillsRow = {
  template: "#skills-item",
  props: {
    skillsRow: Object
  },
  components: { skill }
};

new Vue({
  el: "#skills-component",
  components: {
    skillsRow
  },
  data() {
    return {
      skills: []
    };
  },
  created() {
    const data = require("../../../data/skills.json");
    this.skills = data;
  },
  template: "#skills-list"
});
