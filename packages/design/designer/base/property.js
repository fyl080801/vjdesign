import store from "./store";
import { resolveEditor } from "./editor";
import { cloneDeep, isEmpty, isObject } from "lodash-es";

const propertyKeys = {
  别名: "remark",
  命名槽: "fieldOptions.slot",
  内部文本: "fieldOptions.domProps.innerText",
  水印: "fieldOptions.props.placeholder",
  数据: "model",
  名称: "fieldOptions.attrs.name",
  // 响应输入: "fieldOptions.on",
  样式: "fieldOptions.class",
  显示条件: "displayOptions"
};

const DEFAULTS = [
  propertyKeys.命名槽,
  propertyKeys.别名,
  propertyKeys.样式,
  propertyKeys.显示条件
];

export const resolveProperties = defineMetadata => {
  const cachedProps = {};
  const storedProps = store.properties;
  cloneDeep(DEFAULTS).forEach(item => {
    cachedProps[item] = { property: item, ...storedProps.get(item) };
  });
  (defineMetadata.properties || []).forEach(item => {
    const prop =
      typeof item === "string"
        ? { property: item, ...storedProps.get(item) }
        : item;

    cachedProps[prop.property] = { ...storedProps.get(prop.property), ...prop };
  });

  return cachedProps;
};

/**
 * 注册组件属性
 * @param {String} path
 * @param {Object} def
 */
export const registerProperty = (
  path,
  {
    description, // 名称
    editor, // 编辑器
    defaultValue, // 默认值
    group // 自定义分组名
  }
) => {
  store.properties.set(path, {
    description,
    editor,
    defaultValue,
    group
  });
};

export const assembly = component => {
  const defineMetadata = cloneDeep(store.components.get(component));

  if (!defineMetadata) {
    return {};
  }

  const properties = resolveProperties(defineMetadata);
  const groups = {};

  Object.keys(properties).forEach(prop => {
    if (!properties[prop]) {
      return;
    }

    const { editor, description, group } = properties[prop];
    const { name, options } = isObject(editor) ? editor : { name: editor };
    const { field, component } = resolveEditor(name, prop, options);

    const componentPropertySchema = {
      editorIdentity: description,
      component: "el-form-item",
      fieldOptions: {
        props: {
          label: description
        }
      },
      children: [field],
      instance: component
    };

    if (!isEmpty(group)) {
      // 具有特定的分组名称
      groups[group] = groups[group] || [];
      groups[group].push(componentPropertySchema);
    } else {
      // 将属性按特定规则分组
      if (prop.indexOf("fieldOptions.domProps.") === 0) {
        groups.通用 = groups.通用 || [];
        groups.通用.push(componentPropertySchema);
      } else if (prop.indexOf("fieldOptions.props.") === 0) {
        groups.组件 = groups.组件 || [];
        groups.组件.push(componentPropertySchema);
      } else if (
        prop.indexOf("fieldOptions.style.") === 0 ||
        prop.indexOf("fieldOptions.class") === 0
      ) {
        groups.样式 = groups.样式 || [];
        groups.样式.push(componentPropertySchema);
      } else {
        groups.基础 = groups.基础 || [];
        groups.基础.push(componentPropertySchema);
      }
    }
  });

  return groups;
};

registerProperty(propertyKeys.样式, { description: "样式" });
registerProperty(propertyKeys.别名, { description: "别名", editor: "simple" });
registerProperty(propertyKeys.名称, { description: "名称" });
registerProperty(propertyKeys.命名槽, {
  description: "命名槽",
  editor: "simple"
});
registerProperty(propertyKeys.内部文本, { description: "内部文本" });
registerProperty(propertyKeys.水印, { description: "水印" });
registerProperty(propertyKeys.数据, { description: "数据" });
registerProperty(propertyKeys.响应输入, {
  description: "响应输入",
  editor: "on"
});
registerProperty(propertyKeys.显示条件, {
  description: "显示条件",
  editor: "display"
});

export default {
  DEFAULTS: DEFAULTS,
  ...propertyKeys
};
