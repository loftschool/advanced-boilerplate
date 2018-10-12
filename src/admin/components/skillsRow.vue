<template lang="pug">
  .skills
    .skills-title {{type.name}}
    table
      skills-item(
        v-for="skill in skills"
        v-if="skill.category === type.id"
        :key="skill.id"
        :skill="skill"
      )
      skills-item(
        :editmode="true"
        :typeId="type.id"
      )

    BR
    HR
    BR
</template>

<script>
import skillsItem from "./skillsItem";

export default {
  components: {
    skillsItem
  },
  props: {
    skills: {
      type: Array,
      default: () => []
    },
    type: {
      type: Object,
      default: () => ({
        id: 0,
        name: "Frontend"
      })
    }
  }
};
</script>
