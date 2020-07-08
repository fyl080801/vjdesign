import { uuid } from "../../../utils/helpers";

export const convertTransformData = (value, root) => {
  const result = [];

  if (!value.$type) {
    result.push({ uuid: uuid(), $type: null, isRoot: true });
  } else {
    result.push({ ...eachTransform(value), isRoot: root });
  }

  return result;
};

export const convertTransformResult = value => {
  return eachTransformTree(value[0]);
};

const eachTransform = (value, name) => {
  let result = {
    uuid: uuid(),
    name: name,
    $type: value.$type !== undefined ? value.$type : "raw"
  };

  if (value.$type === undefined) {
    result.raw = value;
  }

  if (["func", "on"].includes(value.$type)) {
    result = {
      ...result,
      children: [],
      $result: value.$result,
      $default: value.$default
    };
    Object.keys(value.$arguments || {}).forEach(key => {
      result.children.push(eachTransform(value.$arguments[key], key));
    });
  } else {
    result = { ...result, $source: value.$source, $default: value.$default };
  }

  return result;
};

const eachTransformTree = value => {
  let result = {
    $type: value.$type
  };

  if (value.$default !== undefined) {
    result.$default = value.$default;
  }

  // 先根据已知条件还原转换值
  if (["func", "on"].includes(value.$type)) {
    result.$arguments = {};
    value.children.forEach(arg => {
      result.$arguments[arg.name] = eachTransformTree(arg);
    });
    result.$result = value.$result;
  } else if (value.$type === "bind") {
    result.$source = value.$source;
  } else if (value.$type === "raw") {
    result = value.raw;
  }

  return result;
};
