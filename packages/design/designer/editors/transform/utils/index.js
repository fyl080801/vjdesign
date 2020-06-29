import { uuid } from "../../../../utils/helpers";

export const convertTransformData = value => {
  const result = [];

  if (!value.$type) {
    result.push({ uuid: uuid(), $type: null, isRoot: true });
  } else {
    result.push(eachTransform(value));
  }

  return result;
};

const eachTransform = (value, name) => {
  let result = {
    uuid: uuid(),
    name: name,
    $type: value.$type
  };

  if (value.$type === "bind") {
    result = { ...result, $source: value.$source, $default: value.$default };
  } else {
    result = {
      ...result,
      children: [],
      $result: value.$result,
      $default: value.$default
    };
    Object.keys(value.$arguments || {}).forEach(key => {
      result.children.push(eachTransform(value, key));
    });
  }
  return result;
};
