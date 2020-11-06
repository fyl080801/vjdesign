export default (field, options) => {
  const { design } = options
  const { registry, profile } = design

  if (
    field.designed ||
    ((field.fieldOptions || {}).class || '').split(' ').includes('designed')
  ) {
    return new Function()
  }

  field._design = profile.components[field.component]

  return (!field._design
    ? registry.designer.default
    : registry.designer[field._design.designer] || registry.designer.default)()
}
