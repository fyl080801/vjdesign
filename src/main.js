import Vue from "vue";
import App from "./App.vue";
import vjdesign from "../package/index";
import ElementUI from "element-ui";
import "./editor/element";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.use(vjdesign);
Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount("#app");
