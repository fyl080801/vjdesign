import defaultDesigner from './default'

export default () => {
  const designer = defaultDesigner()

  return field => {
    field.component = 'div'
    designer(field)
  }
}
