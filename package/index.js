import layout from "./layout";
import ElementUI from "element-ui";
import vjform from "vjform";
import {
  registerComponent,
  registerProperty,
  registerEditor,
  properties
} from "./designer";
import layoutProvider from "./providers/layout";
import designProvider from "./providers/design";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.css";

vjform.provider("design-element", function() {
  return designProvider;
});

vjform.provider("layout", function() {
  return layoutProvider;
});

const install = function(v) {
  v.use(ElementUI);
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
