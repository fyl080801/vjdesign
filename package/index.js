import layout from "./layout";
import ElementUI from "element-ui";
import vjform from "vjform";
import layoutProvider from "./providers/layout";
import designProvider from "./providers/design";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.css";

vjform.provider("layout-component", function() {
  return layoutProvider;
});

vjform.provider("design-component", function() {
  return designProvider;
});

const install = function(v) {
  v.use(ElementUI);
  v.use(vjform);
  v.component(layout.name, layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  ...layout,
  install
};
