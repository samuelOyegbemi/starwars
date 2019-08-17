import Home from "./pages/Home";
import VueRouter from "vue-router";
import About from "./pages/About";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
];

export const router = new VueRouter({
  routes // short for `routes: routes`
});
