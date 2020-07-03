// import {
//   registerComponent,
//   getComponents,
//   getComponentGroups
// } from "./base/component";
// import { registerEditor } from "./base/editor";
// import properties, { registerProperty, assembly } from "./base/property";

// components
// import "./components/html";

// export {
//   registerComponent,
//   registerEditor,
//   registerProperty,
//   assembly,
//   getComponents,
//   getComponentGroups,
//   properties
// };

import feature from "./feature";
import { DEFAULTS, DEFAULT_KEYS } from "./feature/property";

import "./internal/component";
import "./internal/editor";
import "./internal/property";

export default {
  ...feature,
  properties: {
    DEFAULTS: DEFAULTS,
    ...DEFAULT_KEYS
  }
};
