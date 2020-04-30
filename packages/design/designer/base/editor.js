import store from "./store";
import Input from "../editors/Input.vue";
import DisplayOptions from "../editors/DisplayOptions.vue";

/**
 * 注册编辑器
 * @param {String} name 别名
 * @param {Function} fn 函数，返回一个编辑器组件json
 */
export const registerEditor = (name, fn, component) => {
  store.editors.set(name, fn);
  store.editorComponents.set(name, component);
};

export const resolveEditor = (name, path, options) => {
  const factory = store.editors.get(name || "default");
  const component = store.editorComponents.get(name || "default");
  return {
    field: factory(path, options),
    component
  };
};

registerEditor(
  "default",
  path => ({
    component: "v-jdesign-input",
    model: [path]
  }),
  Input
);

registerEditor("simple", path => ({
  component: "el-input",
  model: [path],
  fieldOptions: {
    attrs: {
      placeholder: "请输入"
    }
  }
}));

registerEditor("number", path => ({
  component: "el-input-number",
  model: [path]
}));

registerEditor("checkbox", path => ({
  component: "el-checkbox",
  model: [path]
}));

registerEditor("select", (path, options) => ({
  component: "el-select",
  model: [path],
  children: options.items.map(item => {
    return {
      component: "el-option",
      fieldOptions: { props: { label: item.label, value: item.value } }
    };
  })
}));

registerEditor(
  "display",
  path => ({
    component: "v-jdesign-display",
    model: [path]
  }),
  DisplayOptions
);

// registerEditor("on", path => {
//   return {
//     component: "el-select",
//     model: [path],
//     displayOptions: {
//       model: "model",
//       schema: {
//         type: "string",
//         minLength: 1
//       }
//     },
//     fieldOptions: {
//       props: { multiple: true }
//     },
//     children: [
//       {
//         component: "el-option",
//         fieldOptions: { props: { label: "input", value: "input" } }
//       }
//     ]
//   };
// });

export default {
  DEFAULT: "default"
};
