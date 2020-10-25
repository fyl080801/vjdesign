export default (path, options) => {
  const {
    items = [],
    labelProp = 'label',
    valueProp = 'value',
    placeholder = '请选择'
  } = {
    ...options
  }

  return {
    component: 'select',
    model: [path],
    fieldOptions: { class: 'form-control' },
    children: [
      {
        component: 'option',
        fieldOptions: {
          style: { display: 'none' },
          domProps: {
            value: null,
            disabled: true,
            selected: 'selected',
            innerText: placeholder
          }
        }
      }
    ].concat(
      items.map(item => ({
        component: 'option',
        fieldOptions: {
          domProps: { value: item[valueProp], innerText: item[labelProp] }
        }
      }))
    )
  }
}
