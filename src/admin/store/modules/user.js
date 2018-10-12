const user = {
  actions: {
    refrehToken() {
      this.$axios.post("/refreshToken").then(response => {
        const ttl = Math.floor(Date.now() / 1000 + response.data.ttl);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("ttl", ttl);
        console.log("token refreshed", response.data);
      });
    }
  }
};

export default user;
