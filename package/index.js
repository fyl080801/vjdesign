import layout from "./views";
import ElementUI from "element-ui";
import vjform from "vjform";
import lib from "./lib";
import "./lib/vjform";

import "element-ui/packages/theme-chalk/src/index.scss";
import "./styles/index.scss";

const install = function(v) {
  v.use(ElementUI);
  v.use(vjform);
  v.component("vJdesign", layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  ...layout,
  install,
  feature: lib
};
