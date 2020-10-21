export default (path, options) => {
  const { placeholder = '请输入', type } = options
  return {
    component: 'input',
    model: [path, { type }],
    fieldOptions: { class: 'form-control', domProps: { type, placeholder } }
  }
}
