import { registerEditor } from "../base/editor";

registerEditor("checkbox", path => {
  return {
    component: "el-checkbox",
    model: path,
    fieldOptions: {
      on: ["input"]
    }
  };
});
