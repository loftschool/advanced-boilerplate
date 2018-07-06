<template lang="pug">
  #tabs
    ul.tabs
      li.item(v-for="tab in tabs")
        router-link(
          :to="tab.href"
        ).link {{tab.title}}
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Работы", href: "/works" },
        { title: "Блог", href: "/blog" }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
#tabs {
  background: #f0efe9;
}

.item {
  border-right: 2px solid #fff;
}

.link {
  display: block;
  width: 180px;
  display: block;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  height: 100%;
  display: flex;
}

.tabs {
  display: flex;
}
</style>
