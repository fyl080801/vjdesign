import { registerComponent } from "../base/component";
import property, { registerProperty } from "../base/property";

registerProperty("fieldOptions.domProps.href", { description: "链接地址" });
registerProperty("fieldOptions.domProps.target", { description: "链接目标" });

const components = {
  //
  input: {
    description: "输入框",
    group: "输入元素",
    properties: [property.数据]
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
  //
  div: {
    description: "层",
    group: "容器元素",
    container: true,
    properties: []
  }
};

Object.keys(components).forEach(key =>
  registerComponent(key, Object.assign(components[key], { base: true }))
);
