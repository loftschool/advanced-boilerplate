<template lang="pug">
  .works
    .works__fields
      input(type="text" placeholder="Название проекта" v-model="work.title")
      br
      input(type="text" placeholder="Технологии" v-model="work.techs")
      br
      input(type="text" placeholder="Ссылка" v-model="work.link")
      br
      input(type="file" @change="renderPicAndAddFile")
      hr
      .preview(:style="{backgroundImage: previewPic}")
      hr
      button(type="button" @click="editmode ? editExistedWork(work) : addWork(work)" v-text="editmode ? 'изменить' : 'добавить новую'") 
    .works__table
      table.table
        tr
          td Название
          td Технологии
          td Ссылка
          td Превью
          td
        tr(v-for="work in works")
          td {{work.title}}
          td {{work.techs}}
          td {{work.link}}
          td
            img(:src='`http://localhost:8000/${work.photo}`', width="100", height="100" alt="")
          td 
            button(type="button" @click="removeWork(work.id)") Удалить
            button(type="button" @click="edit(work)") Изменить
        
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      previewPic: "",
      editmode: false,
      work: {
        id: 0,
        title: "",
        techs: "",
        link: "",
        photo: {}
      }
    };
  },
  computed: {
    ...mapState("works", {
      works: state => state.data
    })
  },
  created() {
    this.fetchWorks();
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      removeWork: "works/remove",
      editWork: "works/edit",
      addWork: "works/add"
    }),
    renderPicAndAddFile(e) {
      const renderer = new FileReader();
      const file = e.target.files[0];

      renderer.readAsDataURL(file);
      renderer.onloadend = () => {
        this.previewPic = `url(${renderer.result})`;
      };

      this.work.photo = file;
    },
    createNewWork() {
      this.addWork(this.work);
    },
    edit(work) {
      this.work.id = work.id;
      this.work.title = work.title;
      this.work.link = work.link;
      this.work.techs = work.techs;
      this.previewPic = `url(http://localhost:8000/${work.photo})`;

      this.editmode = true;
    },
    editExistedWork(work) {
      this.editWork(work)
        .then(response => {
          Object.keys(this.work).forEach(key => (this.work[key] = ""));
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.preview {
  width: 200px;
  height: 200px;
  background: center center / contain no-repeat;
}

.works {
  display: flex;
}

.works__table {
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  td {
    border: 1px solid black;
  }
}
</style>
