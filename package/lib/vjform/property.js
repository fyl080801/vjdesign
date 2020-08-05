export default function() {
  return function(field) {
    const { component, rules = [], property } = field

    if (component === 'el-form-item' && rules.length > 0) {
      field.fieldOptions.props.rules = rules
      field.fieldOptions.props.prop = property
    }
  }
}
