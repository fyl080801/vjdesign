import { register } from "../../../packages/design/index";

const { property } = register;

property("fieldOptions.attrs.placeholder", { description: "水印" });
property("fieldOptions.props.labelWidth", { description: "前缀宽度" });
property("fieldOptions.props.label", { description: "前缀" });
property("fieldOptions.props.gutter", {
  description: "间隔",
  editor: "number"
});
property("fieldOptions.props.span", { description: "列宽", editor: "number" });
property("fieldOptions.props.size", {
  description: "尺寸",
  editor: {
    name: "select",
    options: {
      items: [
        { label: "正常", value: "medium" },
        { label: "小", value: "small" },
        { label: "最小", value: "mini" }
      ]
    }
  },
  defaultValue: "medium"
});

property("fieldOptions.props.labelPosition", {
  description: "前缀位置",
  editor: {
    name: "select",
    options: {
      items: [
        { label: "靠右", value: "right" },
        { label: "靠左", value: "left" },
        { label: "顶部", value: "top" }
      ]
    }
  }
});

property("fieldOptions.props.disabled", {
  description: "禁用",
  editor: "checkbox"
});

property("fieldOptions.props.min", {
  description: "最小值",
  editor: "number"
});

property("fieldOptions.props.max", {
  description: "最大值",
  editor: "number"
});

property("fieldOptions.props.step", {
  description: "步长",
  editor: "number"
});

property("fieldOptions.props.range", {
  description: "是否范围",
  editor: "checkbox"
});

property("fieldOptions.props.name", {
  description: "命名",
  editor: "simple"
});

property("fieldOptions.props.required", {
  description: "必填",
  editor: "checkbox"
});
