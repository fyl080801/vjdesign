import {
  registerComponent,
  getComponents,
  getComponentGroups
} from "./base/component";
import { registerEditor } from "./base/editor";
import { registerProperty, assembly } from "./base/property";

// editors
import "./editors/checkbox";

// componentss
import "./components/html";

export {
  registerComponent,
  registerEditor,
  registerProperty,
  assembly,
  getComponents,
  getComponentGroups
};
