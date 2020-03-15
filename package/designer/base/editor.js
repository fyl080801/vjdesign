import store from "./store";

/**
 * 注册编辑器
 * @param {String} name 别名
 * @param {Function} fn 函数，返回一个编辑器组件json
 */
export const registerEditor = (name, fn) => {
  store.editors.set(name, fn);
};

export const resolveEditor = (name, path) => {
  return store.editors.get(name || "default")(path);
};

registerEditor("default", path => {
  return {
    component: "el-input",
    model: path,
    fieldOptions: {
      on: ["input"]
    }
  };
});

registerEditor("number", path => {
  return {
    component: "el-input",
    model: path,
    fieldOptions: {
      on: {
        input: val => {
          try {
            return parseInt(val, 0);
          } catch {
            return 0;
          }
        }
      }
    }
  };
});

registerEditor("checkbox", path => {
  return {
    component: "el-checkbox",
    model: path,
    fieldOptions: {
      on: ["input"]
    }
  };
});

registerEditor("on", path => {
  return {
    component: "el-select",
    model: path,
    displayOptions: {
      model: "model",
      schema: {
        type: "string",
        minLength: 1
      }
    },
    fieldOptions: {
      on: ["input"],
      props: { multiple: true }
    },
    children: [
      {
        component: "el-option",
        fieldOptions: { props: { label: "input", value: "input" } }
      }
    ]
  };
});

export default {
  DEFAULT: "default"
};
