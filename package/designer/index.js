import {
  registerComponent,
  getComponents,
  getComponentGroups
} from "./base/component";
import { registerEditor } from "./base/editor";
import properties, { registerProperty, assembly } from "./base/property";

// componentss
import "./components/html";

export {
  registerComponent,
  registerEditor,
  registerProperty,
  assembly,
  getComponents,
  getComponentGroups,
  properties
};
