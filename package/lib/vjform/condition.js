export default function() {
  return function(field, options) {
    if (options.mode !== "design") {
      return;
    }

    field.component = field.component || field.$conditionComponent;
  };
}
