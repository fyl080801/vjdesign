import layout from "./views";
import ElementUI from "element-ui";
import vjform from "vjform";
import lib from "./lib";

import "./lib/vjform";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";

const install = function(v) {
  v.use(ElementUI);
  v.use(vjform);
  v.component(layout.name, layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// export const register = {
//   // component: registerComponent,
//   // property: registerProperty,
//   // editor: registerEditor,
//   // properties
// };

export default {
  ...layout,
  install,
  feature: lib
};
