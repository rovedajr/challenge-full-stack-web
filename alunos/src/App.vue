<template>
  <v-app>
    <v-app-bar app dark>
    Grupo A Educação
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import Student from './services/students'

export default {
  name: "app",
  mounted() {
    Student.list().then(res => {
      this.students = res.data;
    })
  },
};
</script>
