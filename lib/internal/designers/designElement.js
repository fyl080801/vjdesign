import defaultDesigner from './default'

export default () => {
  const designer = defaultDesigner()

  return field => {
    designer(field)

    field.children[0].component = 'span'
  }
}
