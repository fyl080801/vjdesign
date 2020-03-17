import { register } from "../../../package/index";

const { component } = register;

component("el-form", {
  group: "布局",
  description: "表单",
  container: true,
  properties: [
    "fieldOptions.props.labelWidth",
    "fieldOptions.props.size",
    "fieldOptions.props.labelPosition"
  ],
  base: false
});

component("el-row", {
  group: "布局",
  description: "行",
  container: true,
  properties: ["fieldOptions.props.gutter"],
  base: false
});

component("el-col", {
  group: "布局",
  description: "列",
  container: true,
  properties: ["fieldOptions.props.span"],
  base: false
});

component("el-form-item", {
  group: "布局",
  description: "表单项",
  container: true,
  properties: ["fieldOptions.props.label"],
  base: false
});

component("el-input", {
  group: "输入",
  description: "文本框",
  properties: ["fieldOptions.attrs.placeholder"],
  base: false
});

component("el-select", {
  group: "输入",
  description: "选择器",
  properties: ["fieldOptions.attrs.placeholder"],
  base: false
});
