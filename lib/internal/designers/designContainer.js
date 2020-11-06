import container from './container'

export default () => {
  const designer = container()

  return field => {
    designer(field)

    field.children[0].component = 'div'
  }
}
