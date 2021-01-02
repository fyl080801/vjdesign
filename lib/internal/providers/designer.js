export const designProvider = (field, options) => {
  const { design } = options
  const { registry, profile } = design

  if (profile.components[field.component]) {
    field._design = { uuid: field.uuid, ...profile.components[field.component] }
  }

  if (!field._design || field._designed) {
    return new Function()
  }

  field.options = field.options || {}
  field._designed = true

  const designer =
    (typeof field._design.designer === 'string'
      ? { name: field._design.designer }
      : field._design.designer) || {}
  const designerOptions = { ...designer }

  // 设计器全用节点渲染元素
  delete field.options.direct
  delete designerOptions.name

  return (!field._design
    ? registry.designer.default
    : registry.designer[designer.name] || registry.designer.default)(
    designerOptions
  )
}
