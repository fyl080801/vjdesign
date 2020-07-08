import vjdesign from "../../../package/index";

const { feature } = vjdesign;
const { properties } = feature;

vjdesign.feature.component(
  "el-form",
  {
    group: "Element 布局",
    description: "表单",
    container: true
  },
  [
    "fieldOptions.props.labelWidth",
    "fieldOptions.props.size",
    "fieldOptions.props.labelPosition"
  ]
);

vjdesign.feature.component(
  "el-tabs",
  {
    group: "Element 布局",
    description: "标签页",
    container: true
  },
  [
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
  ]
);

vjdesign.feature.component(
  "el-tab-pane",
  {
    group: "Element 布局",
    description: "标签项",
    container: true
  },
  ["fieldOptions.props.name", "fieldOptions.props.label"]
);

vjdesign.feature.component(
  "el-col",
  {
    group: "Element 布局",
    description: "列",
    container: true
  },
  ["fieldOptions.props.span"]
);

vjdesign.feature.component(
  "el-row",
  {
    group: "Element 布局",
    description: "行",
    container: true
  },
  ["fieldOptions.props.gutter"]
);

vjdesign.feature.component(
  "el-form-item",
  {
    group: "Element 布局",
    description: "表单项",
    container: true
  },
  ["fieldOptions.props.label", "fieldOptions.props.required"]
);

vjdesign.feature.component(
  "el-input",
  {
    group: "Element 输入",
    description: "文本框"
  },
  [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.attrs.placeholder"
  ]
);

vjdesign.feature.component(
  "el-select",
  {
    group: "Element 输入",
    description: "选择器"
  },
  [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.attrs.placeholder"
  ]
);

vjdesign.feature.component(
  "el-input-number",
  {
    group: "Element 输入",
    description: "计数器"
  },
  [properties.数据, "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-switch",
  {
    group: "Element 输入",
    description: "开关"
  },
  [properties.数据, "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-slider",
  {
    group: "Element 输入",
    description: "滑块"
  },
  [
    properties.数据,
    "fieldOptions.props.disabled",
    "fieldOptions.props.range",
    { property: "fieldOptions.props.min", defaultValue: 0 },
    { property: "fieldOptions.props.max", defaultValue: 100 },
    { property: "fieldOptions.props.step", defaultValue: 1 }
  ]
);

vjdesign.feature.component(
  "el-time-select",
  {
    group: "Element 输入",
    description: "时间"
  },
  [properties.数据, "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-date-picker",
  {
    group: "Element 输入",
    description: "日期时间"
  },
  [
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
  ]
);

vjdesign.feature.component(
  "el-rate",
  {
    group: "Element 输入",
    description: "评分"
  },
  [properties.数据, "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-radio-group",
  {
    group: "Element 输入",
    description: "单选项组",
    container: true
  },
  [properties.数据, "fieldOptions.props.size", "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-radio-button",
  {
    group: "Element 输入",
    description: "单选按钮"
  },
  [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ]
);

vjdesign.feature.component(
  "el-radio",
  {
    group: "Element 输入",
    description: "单选项"
  },
  [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ]
);

vjdesign.feature.component(
  "el-checkbox-group",
  {
    group: "Element 输入",
    description: "复选项组",
    container: true
  },
  [properties.数据, "fieldOptions.props.size", "fieldOptions.props.disabled"]
);

vjdesign.feature.component(
  "el-checkbox-button",
  {
    group: "Element 输入",
    description: "复选按钮"
  },
  [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ]
);

vjdesign.feature.component(
  "el-checkbox",
  {
    group: "Element 输入",
    description: "复选项"
  },
  [
    "fieldOptions.props.disabled",
    { property: "fieldOptions.props.label", editor: "simple" }
  ]
);

vjdesign.feature.component("el-table", {
  group: "Element 数据",
  description: "表格"
});

vjdesign.feature.component(
  "el-pagination",
  {
    group: "Element 数据",
    description: "分页"
  },
  [
    {
      description: "分页大小",
      property: "fieldOptions.props.pageSize",
      editor: "number",
      defaultValue: 10
    }
  ]
);
