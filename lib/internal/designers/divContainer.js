import container from './container'

// 设计时将元素变更成一般层元素
export default () => {
  const designer = container()

  return field => {
    field.component = 'div'
    designer(field)
  }
}
