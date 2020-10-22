export default (path, options) => {
  const { placeholder = '请输入' } = options
  return {
    component: 'input',
    model: [`${path}[0]`, { on: 'change', handler: evt => evt.target.value }],
    fieldOptions: { class: 'form-control', domProps: { placeholder } }
  }
}
