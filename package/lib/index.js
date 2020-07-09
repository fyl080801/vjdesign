import feature from "./feature";
import { DEFAULT_KEYS } from "./feature/property";

import "./internal/component";
import "./internal/editor";
import "./internal/property";
import "./internal/datasource";

export default {
  ...feature,
  properties: DEFAULT_KEYS
};
