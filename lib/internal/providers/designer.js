export default (field, options) => {
  const { design } = options
  const { registry, profile } = design

  if (
    field.designed ||
    ((field.fieldOptions || {}).class || '').split(' ').includes('designed')
  ) {
    return new Function()
  }

  if (field.options && field.options.direct) {
    // 设计器全用节点渲染元素
    field.options.direct = false
  }

  field._design = profile.components[field.component]

  return (!field._design
    ? registry.designer.default
    : registry.designer[field._design.designer] || registry.designer.default)()
}
