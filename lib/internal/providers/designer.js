export default (field, options) => {
  const { design } = options
  const { registry } = design
  console.log(registry.designer)
  // 获取组件和设计器集合，根据组件匹配到相应的设计器，改变组件最终render 结构
  return () => {}
}
