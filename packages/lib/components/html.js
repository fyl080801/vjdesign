import { registerComponent } from "../base/component";
import property, { registerProperty } from "../base/property";

registerProperty("fieldOptions.domProps.href", { description: "链接地址" });
registerProperty("fieldOptions.domProps.target", { description: "链接目标" });

const components = {
  //
  input: {
    description: "输入框",
    group: "网页元素",
    properties: [property.数据, property.名称]
  },
  button: {
    description: "按钮",
    group: "网页元素",
    properties: [property.内部文本]
  },
  //
  a: {
    description: "超链接",
    group: "网页元素",
    properties: [
      property.内部文本,
      "fieldOptions.domProps.href",
      "fieldOptions.domProps.target"
    ]
  },
  span: {
    description: "文本块",
    group: "网页元素",
    properties: [property.内部文本]
  },
  p: {
    description: "段落",
    group: "网页元素",
    properties: [property.内部文本]
  },
  legend: {
    description: "分组标题",
    group: "网页元素",
    properties: [property.内部文本]
  },
  //
  div: {
    description: "层",
    group: "网页元素",
    container: true,
    properties: []
  },
  fieldset: {
    description: "分组",
    group: "网页元素",
    container: true,
    properties: []
  },
  form: {
    description: "表单",
    group: "网页元素",
    container: true,
    properties: [
      {
        description: "Method",
        property: "fieldOptions.domProps.method",
        editor: {
          name: "select",
          options: {
            items: [
              { label: "POST", value: "POST" },
              { label: "GET", value: "GET" }
            ]
          }
        },
        defaultValue: "POST"
      },
      {
        description: "URL",
        property: "fieldOptions.domProps.action"
      },
      {
        description: "Target",
        property: "fieldOptions.domProps.target",
        editor: {
          name: "select",
          options: {
            items: [
              { label: "空白页", value: "_blank" },
              { label: "当前页", value: "_self" }
            ]
          }
        },
        defaultValue: "_blank"
      }
    ]
  }
};

Object.keys(components).forEach(key =>
  registerComponent(key, Object.assign(components[key], { base: true }))
);
