import Vue from "vue";
// import VueRouter from "@/vue-router";
import VueRouter from "@/vue-router-official";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    children: [
      {
        path: "a",
        name: 'AboutA',
        component: {
          render(h) {
            return <h1>about a</h1>;
          },
        },
      },
      {
        path: "b",
        name: 'AboutB',
        component: {
          render(h) {
            return <h1>about b</h1>;
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
