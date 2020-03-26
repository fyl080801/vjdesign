import { register } from "../../../packages/design/index";
import { properties } from "../../../packages/design/designer";

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

component("el-tabs", {
  group: "布局",
  description: "标签页",
  container: true,
  properties: [
    properties.数据,
    {
      property: "fieldOptions.props.type",
      description: "类型",
      editor: {
        name: "select",
        options: {
          items: [
            { label: "卡片", value: "card" },
            { label: "带边框卡片", value: "border-card" }
          ]
        }
      },
      defaultValue: "border-card"
    }
  ],
  base: false
});

component("el-tab-pane", {
  group: "布局",
  description: "标签项",
  container: true,
  properties: ["fieldOptions.props.name", "fieldOptions.props.label"],
  base: false
});

component("el-col", {
  group: "布局",
  description: "列",
  container: true,
  properties: ["fieldOptions.props.span"],
  base: false
});

component("el-row", {
  group: "布局",
  description: "行",
  container: true,
  properties: ["fieldOptions.props.gutter"],
  base: false
});

component("el-form-item", {
  group: "布局",
  description: "表单项",
  container: true,
  properties: ["fieldOptions.props.label", "fieldOptions.props.required"],
  base: false
});

component("el-input", {
  group: "输入",
  description: "文本框",
  properties: [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.attrs.placeholder"
  ],
  base: false
});

component("el-select", {
  group: "输入",
  description: "选择器",
  properties: [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.attrs.placeholder"
  ],
  base: false
});

component("el-input-number", {
  group: "输入",
  description: "计数器",
  properties: [properties.数据, "fieldOptions.props.disabled"],
  base: false
});

component("el-switch", {
  group: "输入",
  description: "开关",
  properties: [properties.数据, "fieldOptions.props.disabled"],
  base: false
});

component("el-slider", {
  group: "输入",
  description: "滑块",
  properties: [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.props.range",
    { property: "fieldOptions.props.min", defaultValue: 0 },
    { property: "fieldOptions.props.max", defaultValue: 100 },
    { property: "fieldOptions.props.step", defaultValue: 1 }
  ],
  base: false
});

component("el-time-select", {
  group: "输入",
  description: "时间",
  properties: [properties.数据, "fieldOptions.props.disabled"],
  base: false
});

component("el-date-picker", {
  group: "输入",
  description: "日期时间",
  properties: [
    properties.数据,
    "fieldOptions.props.disabled",
    {
      description: "数据格式",
      property: "fieldOptions.props.valueFormat",
      defaultValue: "yyyy-MM-dd HH:mm:ss"
    },
    {
      property: "fieldOptions.props.type",
      description: "类型",
      editor: {
        name: "select",
        options: {
          items: [
            { label: "日期", value: "date" },
            { label: "日期时间", value: "datetime" },
            { label: "时间段", value: "daterange" }
          ]
        }
      }
    }
  ],
  base: false
});

component("el-rate", {
  group: "输入",
  description: "评分",
  properties: [properties.数据, "fieldOptions.props.disabled"],
  base: false
});

component("el-radio-group", {
  group: "输入",
  description: "单选项组",
  properties: [
    properties.数据,
    "fieldOptions.props.size",
    "fieldOptions.props.disabled"
  ],
  container: true,
  base: false
});

component("el-radio-button", {
  group: "输入",
  description: "单选按钮",
  properties: [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ],
  base: false
});

component("el-radio", {
  group: "输入",
  description: "单选项",
  properties: [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ],
  base: false
});

component("el-checkbox-group", {
  group: "输入",
  description: "复选项组",
  properties: [
    properties.数据,
    "fieldOptions.props.size",
    "fieldOptions.props.disabled"
  ],
  container: true,
  base: false
});

component("el-checkbox-button", {
  group: "输入",
  description: "复选按钮",
  properties: [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ],
  base: false
});

component("el-checkbox", {
  group: "输入",
  description: "复选项",
  properties: [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ],
  base: false
});

component("el-table", {
  group: "数据",
  description: "表格",
  properties: [],
  base: false
});

component("el-pagination", {
  group: "数据",
  description: "分页",
  properties: [
    {
      description: "分页大小",
      property: "fieldOptions.props.pageSize",
      editor: "number",
      defaultValue: 10
    }
  ],
  base: false
});
