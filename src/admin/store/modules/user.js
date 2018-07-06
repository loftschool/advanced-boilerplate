const user = {
  state: {
    userdata: {}
  },
  mutations: {
    fillUpUserData(state, user) {
      state.userdata = user;
    }
  },
  getters: {
    userId: state => state.userdata.id
  },
  actions: {
    getUserInfo({ commit, state }) {
      return this.$axios
        .get("/user")
        .then(
          response => {
            commit("fillUpUserData", response.data.user);
          },
          error => {
            console.log("usererrororr");
          }
        )
        .catch(e => console.error(e));
    }
  }
};

export default user;
