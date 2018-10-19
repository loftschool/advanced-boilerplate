<template lang="pug"> 
.form 
  input(type="text" placeholder="login" v-model="user.name") 
  input(type="password" placeholder="password" v-model="user.password")
  button(type="button" @click="sendData") Отправить
</template>
<script>
import axios from "axios";
import { logicalExpression } from 'babel-types';
export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    sendData() {
      axios.post('http://localhost:8000/login', this.user).then(response => {
        if (response.status === 200) {
          const ttl = Math.floor(Date.now() / 1000 + response.data.ttl)

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('ttl', ttl);

          // window.location.href = "/admin"
        
        }
      })
    }
  }
};
</script>

