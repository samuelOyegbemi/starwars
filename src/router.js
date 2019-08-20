import Home from "./pages/Home";
import VueRouter from "vue-router";
import Starships from "./pages/Starships";
import Characters from "./pages/Characters";
import P404 from "./pages/P404";
import CharacterDetail from "./pages/CharacterDetail";
import StarshipDetail from "./pages/StarshipDetail";

const routes = [
  { path: "/", component: Home },
  { path: "/starships", component: Starships },
  { path: "/characters", component: Characters },
  {
    path: "/characters/:id",
    component: CharacterDetail
  },
  {
    path: "/starships/:id",
    component: StarshipDetail
  },
  { path: "*", component: P404 }
];

export const router = new VueRouter({
  routes
});
