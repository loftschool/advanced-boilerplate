<template lang="pug">
  tr(v-if="editmode === false")
    td {{skill.title}}
    td 
      span {{skill.percents}} %
    td
      button() удалить
  
  tr(v-else)
    td 
      input(type="text" v-model="newSkill.title") 
    td 
      input(type="text" v-model="newSkill.percents") 
      span %
    td
      button(@click="addSkill") Добавить

</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    editmode: {
      type: Boolean,
      default: false
    },
    typeId: {
      type: Number,
      default: 0
    },
    skill: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newSkill: {
        title: "",
        percents: "",
        category: this.typeId
      }
    };
  },
  methods: {
    ...mapActions(["addNewSkill"]),
    addSkill() {
      this.addNewSkill(this.newSkill).then(r => {
        this.newSkill.title = "";
        this.newSkill.percents = "";
      });
    }
  }
};
</script>
