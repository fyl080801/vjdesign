export default (path, options) => {
  const { items = [], labelProp = 'label', valueProp = 'value' } = {
    ...options
  }

  return {
    component: 'select',
    model: [path],
    fieldOptions: { class: 'form-control' },
    children: items.map(item => ({
      component: 'option',
      fieldOptions: {
        domProps: { value: item[valueProp], innerText: item[labelProp] }
      }
    }))
  }
}
