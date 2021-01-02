export const elFormExtends = ({ provider }) => {
  provider(field => {
    if (!field.elForm) {
      return
    }

    // 复制组件原始配置
    const originField = { ...field }

    // 将组件名改成 el-form-item
    field.component = 'el-form-item'

    // 将原组件的复制赋给组件下级实现改变界面结构
    field.children = [originField]

    // 将 elForm 属性作为 el-form-item 的属性
    field.fieldOptions = {
      props: field.elForm
    }

    // 如果组件关联了数据属性则将数据属性作为 el-form-item 的数据属性
    if (originField.model) {
      field.fieldOptions.props.prop = Array.isArray(originField.model)
        ? originField.model[0]
        : originField.model
    }

    // 删除 elForm 定义避免下级组件渲染处理时无限循环
    delete field.elForm
    delete originField.elForm
    delete originField.colProps
  }).withIndex(1)

  provider(field => {
    if (!field.colProps || Object.keys(field.colProps).length <= 0) {
      return
    }

    const originField = { ...field }
    field.component = 'el-col'
    field.children = [originField]
    field.fieldOptions = {
      props: { ...field.colProps }
    }

    delete field.colProps
    delete originField.colProps
  }).withIndex(2)
}
