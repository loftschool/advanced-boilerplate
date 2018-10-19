const works = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    fillUpWorksData: (state, works) => (state.data = works),
    removeWork: (state, id) =>
      (state.data = state.data.filter(work => work.id !== id)),
    editWork: (state, editedWork) =>
      (state.data = state.data.map(work => {
        return work.id === editedWork.id ? editedWork : work;
      })),
    addWork: (state, work) => state.data.push(work)
  },
  actions: {
    fetch({ commit }) {
      this.$axios.get("/works/1").then(response => {
        commit("fillUpWorksData", response.data);
      });
    },
    remove({ commit }, id) {
      this.$axios.delete(`/works/${id}`).then(response => {
        commit("removeWork", id);
      });
    },
    edit({ commit }, work) {
      const formData = new FormData();

      Object.keys(work).forEach(key => {
        const value = work[key];
        formData.append(key, value);
      });

      return this.$axios
        .post(`/workssd/${work.id}`, formData)
        .then(response => {
          // console.log('in edit', response);
          commit("editWork", response.data.work);

          return response;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    },
    add({ commit }, work) {
      const formData = new FormData();

      Object.keys(work).forEach(key => {
        const value = work[key];
        formData.append(key, value);
      });

      this.$axios.post(`/works`, formData).then(response => {
        commit("addWork", response.work);
      });
    }
  }
};

export default works;
