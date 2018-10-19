<template lang="pug">
  #root
    .header
      app-header
    .tabs
      tabs
    .content
      router-view
</template>

<script>
import header from "./components/header";
import tabs from "./components/tabs";

export default {
  components: {
    appHeader: header,
    tabs
  }
};
</script>
<style lang="scss">
body,
html {
  margin: 0;
  height: 100%;
}

.wrapper {
  height: 100%;
}

#root {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.header {
  height: 80px;
}

ul {
  padding: 0;
  margin: 0;

  li {
    list-style: none;
  }
}

* {
  box-sizing: border-box;
}

.tabs {
  height: 60px;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
