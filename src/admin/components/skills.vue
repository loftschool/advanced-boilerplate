<template lang="pug">
  #about
    button(@click="logout()") Выйти
    h1 Страница обо мне
    skillsRow(
      v-for="type in types"
      :key="type.name"
      :type="type"
      :skills="skills"
    )

</template>

<script>
import skillsRow from "./skillsRow";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    skillsRow
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
    ...mapState({
      skills: state => state.skills.data
    }),
    ...mapGetters(["userId"])
  },
  watch: {
    userId() {
      // this.fetchSkills();
    }
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    ...mapActions(["fetchSkills", "getUserInfo", "logout"])
  }
};
</script>
