import container from './container'

// 将元素class用在设计器容器上
export default () => {
  const designer = container()

  return field => {
    designer(field)

    field.fieldOptions.props.copyClass = true
  }
}
