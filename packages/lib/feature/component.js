import { getFeature } from "./map";
import { getProperties } from "./property";
import { isEmpty, cloneDeep } from "lodash-es";

export const getComponent = name => {
  return cloneDeep(getFeature("component").get(name));
};

export const getComponents = filter => {
  const result = [];
  const stored = getFeature("component");

  stored.forEach((component, key) => {
    if (!isEmpty(filter) && component.description.indexOf(filter) < 0) {
      return;
    }

    const properties = getProperties(component.properties);

    result.push({
      group: component.group,
      icon: component.icon || "",
      description: component.description,
      container: component.container,
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

export const getGroups = filter => {
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

export default store => {
  return (
    name,
    {
      group, // 分组
      description, // 名称
      icon, // 图标
      container // 是否容器
    },
    properties = []
  ) => {
    const component = {
      group: group || "其他",
      description,
      icon,
      properties,
      container
    };

    store.set(name, component);

    // 是否有必要链式组装？
    const assembly = {
      property(prop) {
        component.properties.push(prop);
        return assembly;
      },
      description(str) {
        component.description = str;
        return assembly;
      }
    };

    return assembly;
  };
};
