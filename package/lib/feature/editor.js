import { getFeature } from "./map";

export const getEditor = (name = "default") => {
  return getFeature("editor").get(name);
};

export const getEditorFactory = name => {
  const instance = getEditor(name);

  return (path, options) => {
    return {
      field: instance.factory(path, options),
      components: instance.components
    };
  };
};

export default store => {
  // factory 用于创建编辑器的定义
  return (name, factory, components = {}) => {
    const editor = {
      factory,
      components: components
    };

    store.set(name, editor);
  };
};
