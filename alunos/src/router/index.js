import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/students-list",
      name: "students-list",
      component: () => import("../components/StudentsList.vue")
    },
  ]
});
