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
