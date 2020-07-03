import feature from "../feature";
import TransformInput from "../editors/Input";

feature.editor(
  "default",
  path => ({
    component: "v-jdesign-input",
    model: [path]
  }),
  TransformInput
);

feature.editor("simple", path => ({
  component: "el-input",
  model: [path],
  fieldOptions: {
    attrs: {
      placeholder: "请输入"
    }
  }
}));

feature.editor("number", path => ({
  component: "el-input-number",
  model: [path]
}));

feature.editor("checkbox", path => ({
  component: "el-checkbox",
  model: [path]
}));

feature.editor("select", (path, options) => ({
  component: "el-select",
  model: [path],
  children: options.items.map(item => {
    return {
      component: "el-option",
      fieldOptions: { props: { label: item.label, value: item.value } }
    };
  })
}));

// registerEditor(
//   "display",
//   path => ({
//     component: "v-jdesign-display",
//     model: [path]
//   }),
//   DisplayOptions
// );

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
