import { getFeature } from "./map";
import component from "./component";
import editor from "./editor";
import property from "./property";
import datasource from "./datasource";

const registers = {
  component,
  editor,
  property,
  datasource
};

export const register = feature => {
  return (registers[feature] || function() {})(getFeature(feature));
};

export default {
  component: register("component"),
  property: register("property"),
  editor: register("editor"),
  datasource: register("datasource")
};
