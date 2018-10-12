const skills = {
  state: {
    data: []
  },
  mutations: {
    fillUpSkills(state, skills) {
      state.data = skills;
    },
    addSkillToState(state, skill) {
      state.data.push(skill);
    }
  },
  actions: {
    addNewSkill({ commit }, skill) {
      console.log(skill);
      return this.$axios
        .post("/skills", skill)
        .then(response => {
          commit("addSkillToState", response.data);
          console.log("addSkill", response);
        })
        .catch(e => console.error(e));
    },
    fetchSkills({ commit }) {
      return this.$axios
        .get(`/skills/1`)
        .then(response => {
          commit("fillUpSkills", response.data);
        })
        .catch(e => console.error(e));
    },
    addNewWork(store, work) {
      console.log(work);
      return this.$axios.post("/works", work).then(response => {
        console.log("work was added", response);
      });
    }
  }
};

export default skills;
