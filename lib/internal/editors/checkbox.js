export default path => {
  return {
    component: 'div',
    children: [
      {
        component: 'input',
        model: [path],
        fieldOptions: { domProps: { type: 'checkbox' } }
      }
    ]
  }
}
