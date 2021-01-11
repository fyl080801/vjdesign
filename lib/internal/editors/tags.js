export default path => {
  return {
    component: 'div',
    fieldOptions: { class: 'input-group' },
    children: [
      {
        component: 'div',
        fieldOptions: { class: 'input-group-prepend' },
        children: [
          {
            component: 'label',
            text: '数组',
            fieldOptions: { class: 'input-group-text' }
          }
        ]
      },
      {
        component: 'input',
        fieldOptions: {
          class: 'form-control',
          domProps: {
            placeholder: '输入项用逗号分割',
            value: `$:(model.${path}||[]).join(',')`
          },
          on: {
            change: evt => {
              const inputs = (evt.target.value || '').split(',')
              const isNumber = !inputs.find(
                item =>
                  item.trim() !== 'true' &&
                  item.trim() !== 'false' &&
                  !isNaN(+item.trim())
              )
              return isNumber ? inputs.map(item => +item) : inputs
            }
          }
        }
      }
    ]
  }
}
