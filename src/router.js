import Home from "./pages/Home";
import VueRouter from "vue-router";
import Starships from "./pages/Starships";
import Characters from "./pages/Characters";
import P404 from "./pages/P404";
import CharacterDetail from "./pages/CharacterDetail";
import StarshipDetail from "./pages/StarshipDetail";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home Page | Starwars"
    }
  },
  {
    path: "/starships",
    component: Starships,
    meta: {
      title: "Starships | Starwars"
    }
  },
  {
    path: "/characters",
    component: Characters,
    meta: {
      title: "Characters | Starwars"
    }
  },
  {
    path: "/characters/:id",
    component: CharacterDetail,
    meta: {
      title: "Character | Starwars"
    }
  },
  {
    path: "/starships/:id",
    component: StarshipDetail,
    meta: {
      title: "Starship | Starwars"
    }
  },
  {
    path: "*",
    component: P404,
    meta: {
      title: "Error | Starwars"
    }
  }
];

export const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const nextRouteTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  const nextRouteMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nextRouteTitle) document.title = nextRouteTitle.meta.title;

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );

  if (!nextRouteMeta) return next();
  nextRouteMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));
  next();
});
