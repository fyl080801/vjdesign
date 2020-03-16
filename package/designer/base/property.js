import store from "./store";
import { resolveEditor } from "./editor";
import { cloneDeep } from "lodash-es";

const propertyKeys = {
  别名: "remark",
  命名槽: "fieldOptions.slot",
  内部文本: "fieldOptions.domProps.innerText",
  水印: "fieldOptions.props.placeholder",
  响应输入: "fieldOptions.on",
  样式: "fieldOptions.class"
};

const DEFAULTS = [propertyKeys.命名槽, propertyKeys.别名, propertyKeys.样式];

const resolveProperties = defineMetadata => {
  const cachedProps = {};
  cloneDeep(DEFAULTS).forEach(prop => {
    cachedProps[prop] = "";
  });
  (defineMetadata.properties || []).forEach(prop => {
    cachedProps[prop] = "";
  });

  return Object.keys(cachedProps);
};

/**
 * 注册组件属性
 * @param {String} path
 * @param {Object} def
 */
export const registerProperty = (path, { description, editor }) => {
  store.properties.set(path, {
    description,
    editor
  });
};

export const assembly = component => {
  const defineMetadata = cloneDeep(store.components.get(component));

  if (!defineMetadata) {
    return {};
  }

  const storedProps = store.properties;
  const properties = resolveProperties(defineMetadata);
  const groups = {};

  properties.forEach(prop => {
    const definedProperty = storedProps.get(prop);

    if (definedProperty) {
      const componentPropertySchema = {
        editorIdentity: definedProperty.description,
        component: "el-form-item",
        fieldOptions: {
          props: {
            label: definedProperty.description
          }
        },
        children: [resolveEditor(definedProperty.editor, prop)]
      };

      // 将编辑器项分组
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
registerProperty(propertyKeys.别名, { description: "别名" });
registerProperty(propertyKeys.命名槽, { description: "命名槽" });
registerProperty(propertyKeys.内部文本, { description: "内部文本" });
registerProperty(propertyKeys.水印, { description: "水印" });
registerProperty(propertyKeys.响应输入, {
  description: "响应输入",
  editor: "on"
});

export default {
  DEFAULTS: DEFAULTS,
  ...propertyKeys
};
