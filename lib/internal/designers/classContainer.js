import container from './container'

// 将元素class用在设计器容器上
export default options => {
  const designer = container(options)

  return field => {
    designer(field)

    field.fieldOptions.props.copyClass = true
  }
}
