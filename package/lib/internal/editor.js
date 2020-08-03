import feature from "../feature";
import TransformInput from "../editors/Input";
import TransformCheckbox from "../editors/Checkbox";
// import { Input, InputNumber, Checkbox, Select, Option } from "element-ui";

feature.editor(
  "default",
  (path, options) => ({
    component: "v-jdesign-input",
    model: [path],
    fieldOptions: options
  }),
  { TransformInput }
);

feature.editor(
  "simple",
  path => ({
    component: "el-input",
    model: [path],
    fieldOptions: {
      attrs: {
        placeholder: "请输入"
      }
    }
  })
  // { "el-input": Input }
);

feature.editor(
  "number",
  path => ({
    component: "el-input-number",
    model: [path]
  })
  // {
  //   "el-input-number": InputNumber
  // }
);

feature.editor(
  "checkbox",
  path => ({
    component: "v-jdesign-checkbox",
    model: [path]
  }),
  { TransformCheckbox }
);

feature.editor(
  "check",
  path => ({
    component: "el-checkbox",
    model: [path]
  })
  // {
  //   "el-checkbox": Checkbox
  // }
);

feature.editor(
  "select",
  (path, options) => ({
    component: "el-select",
    model: [path],
    children: options.items.map(item => {
      return {
        component: "el-option",
        fieldOptions: { props: { label: item.label, value: item.value } }
      };
    })
  })
  // { "el-select": Select, "el-option": Option }
);

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
