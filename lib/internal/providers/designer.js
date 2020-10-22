export default (field, options) => {
  const { design } = options
  const { registry, profile } = design

  if (
    field.designed ||
    ((field.fieldOptions || {}).class || '').split(' ').includes('designed')
  ) {
    return new Function()
  }

  const component = profile.components[field.component]

  return !component
    ? registry.designer.default
    : registry.designer[component.designer] || registry.designer.default
}
