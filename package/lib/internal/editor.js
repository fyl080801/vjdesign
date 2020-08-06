import feature from '../feature'
import TransformInput from '../editors/Input'
import TransformCheckbox from '../editors/Checkbox'
// import { Input, InputNumber, Checkbox, Select, Option } from "element-ui";

feature.editor(
  'default',
  (path, options) => ({
    component: 'v-jdesign-input',
    model: [path],
    fieldOptions: options
  }),
  { TransformInput }
)

feature.editor('simple', path => ({
  component: 'input',
  model: [path],
  fieldOptions: {
    class: 'form-control form-control-sm',
    attrs: { placeholder: '请输入' }
  }
}))

feature.editor('number', path => ({
  component: 'input',
  model: [path],
  fieldOptions: {
    class: 'form-control form-control-sm',
    domProps: { type: 'number' }
  }
}))

feature.editor(
  'checkbox',
  path => ({
    component: 'v-jdesign-checkbox',
    model: [path]
  }),
  { TransformCheckbox }
)

feature.editor('check', path => ({
  component: 'input',
  model: [path],
  fieldOptions: {
    class: 'form-check-input',
    domProps: { type: 'checkbox' }
  }
}))

feature.editor('select', (path, options) => ({
  component: 'select',
  model: [path],
  fieldOptions: {
    class: 'form-control form-control-sm'
  },
  children: options.items.map(item => {
    return {
      component: 'option',
      fieldOptions: { domProps: { innerText: item.label, value: item.value } }
    }
  })
}))

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
