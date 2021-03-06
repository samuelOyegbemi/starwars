import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faAngleRight,
  faSearch,
  faAngleLeft,
  faCaretRight,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch);
library.add(faCaretRight);
library.add(faCaretLeft);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faArrowRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
