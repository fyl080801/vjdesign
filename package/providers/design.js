import emiter from "../utils/emiter";

export default function(field, options) {
  if (
    !options.dev ||
    field.layout ||
    ((field.fieldOptions || {}).class || "").indexOf("design-element") >= 0
  ) {
    return;
  }
  field.fieldOptions = field.fieldOptions || {};
  field.fieldOptions.class = field.fieldOptions.class || "";
  field.fieldOptions.on = field.fieldOptions.on || {};
  field.fieldOptions.class = "design-element " + field.fieldOptions.class;
  field.fieldOptions.on.click = evt => {
    emiter.$emit("component-selected", field);
    evt.stopPropagation();
  };
}
