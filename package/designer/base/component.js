import store from "./store";

/**
 * 注册组件
 * @param {String} name 组件名
 * @param {Object} def 定义
 */
export const registerComponent = (
  name,
  { group, description, icon, properties, field, base, container }
) => {
  store.components.set(name, {
    group: group || "其他",
    description,
    field,
    icon,
    properties,
    container,
    base
  });
};

export const getComponents = base => {
  const result = [];
  store.components.forEach((val, key) => {
    if (base !== undefined && val.base !== base) {
      return;
    }

    result.push({
      group: val.group,
      icon: val.icon || "",
      description: val.description,
      field: val.field,
      container: val.container,
      tag: key
    });
  });
  return result;
};

export const getComponentGroups = base => {
  const groups = {};
  const components = getComponents(base);
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
