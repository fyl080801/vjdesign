import container from './container'

export default () => {
  const designer = container()

  return field => {
    field.component = 'div'
    designer(field)
  }
}
