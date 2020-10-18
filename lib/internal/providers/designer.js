export default (field, options) => {
  const { design } = options
  const { registry, profile } = design

  if (field.skipDesigner) {
    return new Function()
  }

  const component = profile.components.find(
    item => item.name === field.component
  )

  return !component
    ? registry.designer.default
    : registry.designer[component.designer] || registry.designer.default
}
