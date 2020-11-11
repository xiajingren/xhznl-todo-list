import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Todo",
    component: () => import("../views/Todo.vue"),
  },
  {
    path: "/done",
    name: "Done",
    component: () => import("../views/Done.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
