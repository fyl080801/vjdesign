import store from "./store";
import { resolveProperties } from "./property";
import { isEmpty } from "lodash-es";

/**
 * 注册组件
 * @param {String} name 组件名
 * @param {Object} def 定义
 */
export const registerComponent = (
  name,
  {
    group, // 分组
    description, // 名称
    icon, // 图标
    properties, // 属性
    base, // 是否基础html组件
    container // 是否容器
  }
) => {
  store.components.set(name, {
    group: group || "其他",
    description,
    icon,
    properties,
    container,
    base
  });
};

export const getComponents = filter => {
  const result = [];

  store.components.forEach((cmp, key) => {
    if (!isEmpty(filter) && cmp.description.indexOf(filter) < 0) {
      return;
    }

    const properties = resolveProperties(cmp);

    result.push({
      group: cmp.group,
      icon: cmp.icon || "",
      description: cmp.description,
      container: cmp.container,
      defaults: Object.keys(properties)
        .filter(key => properties[key].defaultValue !== undefined)
        .map(key => ({
          property: key,
          value: properties[key].defaultValue
        })),
      tag: key
    });
  });
  return result;
};

export const getComponentGroups = filter => {
  const groups = {};
  const components = getComponents(filter);
  components.forEach(item => {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
  });

  const result = [];
  Object.keys(groups).forEach(key => {
    result.push({
      name: key,
      components: groups[key]
    });
  });
  return result;
};
