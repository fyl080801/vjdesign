import defaultDesigner from './default'

export default () => {
  const designer = defaultDesigner()

  return field => {
    designer(field)

    const realField = field.children[0]

    realField.children
      .filter(child => child)
      .forEach(child => {
        child.fieldOptions = child.fieldOptions || {}
        child.fieldOptions.class = child.fieldOptions.class || ''
        child.fieldOptions.class = child.fieldOptions.class + ' designed'
      })
  }
}
