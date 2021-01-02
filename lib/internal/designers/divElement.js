import defaultDesigner from './default'

// 设计时将元素变更成一般层元素
export default options => {
  const designer = defaultDesigner(options)

  return field => {
    field.component = 'div'
    designer(field)
  }
}
