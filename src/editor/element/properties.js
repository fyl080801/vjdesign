import { register } from "../../../package/index";

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
  }
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
