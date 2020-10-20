import layout from "./views";
import lib from "./lib";
import "./lib/vjform";

import "element-ui/packages/theme-chalk/src/index.scss";
import "./styles/index.scss";

const install = function(Vue) {
  Vue.component("vJdesign", layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  ...layout,
  install,
  feature: lib
};
