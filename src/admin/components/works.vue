<template lang="pug">
  .wrap
    input(type="text" placeholder="title" v-model="work.title")
    input(type="text" placeholder="techs" v-model="work.techs")
    input(type="text" placeholder="link" v-model="work.link")
    input(type="file" @change="addPhoto")
    button(@click="addWork") Добавить
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      work: {
        title: "",
        techs: "",
        link: "",
        photo: ""
      }
    };
  },
  methods: {
    ...mapActions(["addNewWork"]),
    addPhoto(e) {
      const files = e.target.files;
      if (files.length === 0) return;

      this.work.photo = files[0];
    },
    addWork() {
      const formData = new FormData();

      Object.keys(this.work).forEach(prop => {
        formData.append(prop, this.work[prop]);
      });

      this.addNewWork(formData);
    }
  }
};
</script>
