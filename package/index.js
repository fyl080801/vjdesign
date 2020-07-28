import layout from "./views";
import lib from "./lib";
import SvgIcon from "vue-svgicon";
import "./icons/components";
import "./lib/vjform";

import "element-ui/packages/theme-chalk/src/index.scss";
import "./styles/index.scss";

const install = function(Vue) {
  Vue.component("vJdesign", layout);
  Vue.use(SvgIcon, {
    tagName: "svg-icon",
    defaultWidth: "1em",
    defaultHeight: "1em"
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  ...layout,
  install,
  feature: lib
};
