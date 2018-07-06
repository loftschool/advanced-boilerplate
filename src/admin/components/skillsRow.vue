<template lang="pug">
  .skills
    .skills-title {{type.name}}
    table.skills-list
      skill-item(
        v-for="skill in skills"
        v-if="skill.category === type.id"
        :key="skill.id"
        :skill="skill"
      )
      skill-item(
        :editmode="true"
        :typeId="type.id"
      )
    HR

</template>

<script>
import skillItem from "./skillItem";

export default {
  components: {
    skillItem
  },
  props: {
    type: {
      type: Object,
      default: () => {}
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  mehtods: {
    fromNameToNum(name) {
      switch (name) {
        case "frontend":
          return 0;
        case "backend":
          return 1;
        case "workflow":
          return 2;
      }
    }
  }
};
</script>
