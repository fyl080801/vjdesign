import store from "./store";

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

export const getComponents = base => {
  const result = [];
  store.components.forEach((val, key) => {
    if (base !== undefined && val.base !== base) {
      return;
    }
    console.log(val);

    result.push({
      group: val.group,
      icon: val.icon || "",
      description: val.description,
      container: val.container,
      base: val.base,
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
