import layout from "./views";
import ElementUI from "element-ui";
import vjform from "vjform";
import {
  registerComponent,
  registerProperty,
  registerEditor,
  properties
} from "./lib";
import extension from "./lib/extension";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";

vjform.feature("provider")("design-element", extension.design);
vjform.feature("provider")("layout", extension.layout);

const install = function(v) {
  v.use(ElementUI, { size: "small" });
  v.use(vjform);
  v.component(layout.name, layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const register = {
  component: registerComponent,
  property: registerProperty,
  editor: registerEditor,
  properties
};

export default {
  ...layout,
  install
};
