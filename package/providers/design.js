export default function(field) {
  if (field.layout) {
    return;
  }

  field.fieldOptions = field.fieldOptions || {};
  field.fieldOptions.class = field.fieldOptions.class || "";
  field.fieldOptions.class = "design-element " + field.fieldOptions.class;
}
