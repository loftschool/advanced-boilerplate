<template lang="pug">
  #about
    app-form
    h1 Страница обо мне
    skills-row(
      v-for="type in types"
      :key="type.id"
      :type="type"
      :skills="skills"
    )
</template>

<script>
import skillsRow from "./skillsRow";
import form from "./form";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    skillsRow,
    appForm: form
  },
  data() {
    return {
      types: [
        { id: 0, name: "frontend" },
        { id: 1, name: "backend" },
        { id: 2, name: "workflow" }
      ]
    };
  },
  computed: {
    ...mapState("skills", {
      skills: state => state.data
    })
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    ...mapActions({
      fetchSkills: "skills/fetch"
    })
  }
};
</script>
