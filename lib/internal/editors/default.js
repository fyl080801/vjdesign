export default path => ({
  component: 'input',
  // model: [path],
  fieldOptions: {
    class: 'form-control',
    domProps: { '$:value': 'model.' + path },
    on: { [`@${path}:change`]: 'arguments[0].target.value' }
  }
})
