export default (path, options) => {
  const { placeholder = '请输入' } = options
  return {
    component: 'input',
    model: [
      path,
      { type: 'number', on: 'change', handler: evt => evt.target.value }
    ],
    fieldOptions: {
      class: 'form-control',
      domProps: { type: 'number', placeholder }
    }
  }
}
