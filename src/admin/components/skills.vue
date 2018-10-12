<template lang="pug">
  #about
    button(@click="refresh") Обновить токен
    h1 Страница обо мне
    skills-row(
      v-for="type in types"
      :key="type.name",
      :type="type"
      :skills="skills"
    )
</template>

<script>
import skillsRow from "./skillsRow";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    skillsRow
  },
  data() {
    return {
      types: [
        { id: 0, name: "Frontend" },
        { id: 1, name: "backend" },
        { id: 2, name: "workflow" }
      ]
    };
  },
  computed: {
    ...mapState({
      skills: state => state.skills.data
    })
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    ...mapActions(["fetchSkills", "refrehToken"]),
    refresh() {
      this.refrehToken();
    }
  }
};
</script>
