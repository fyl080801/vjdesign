import feature from "../feature";

// object
feature.datasource("object", "对象数据", [
  { property: "data", description: "数据" }
]);

// request
feature.datasource("request", "HTTP请求", [
  {
    property: "url",
    description: "请求地址",
    editor: "simple"
  },
  {
    property: "method",
    description: "方法",
    editor: {
      name: "select",
      options: {
        items: [
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" }
        ]
      }
    },
    defaultValue: "GET"
  },
  {
    property: "autoload",
    description: "自动请求",
    editor: "checkbox"
  },
  {
    property: "data",
    description: "请求数据"
  },
  {
    property: "params",
    description: "参数"
  }
]);
