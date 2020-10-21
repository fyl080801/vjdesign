export default (path, options) => {
  const { placeholder = '请输入' } = options
  return {
    component: 'input',
    model: [`${path}[0]`],
    fieldOptions: { class: 'form-control', domProps: { placeholder } }
  }
}
