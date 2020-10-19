import store from '../../store'

export default field => {
  const cloned = {
    ...field,
    designed: true,
    component: field.component
  }

  const { uuid, component, remark } = cloned

  Object.keys(field).forEach(key => {
    delete field[key]
  })

  field.component = 'div'
  field.fieldOptions = {
    class:
      'v-jd-design-wrapper drag-handler ' +
      (store.getters.form.editing === uuid ? 'editing' : ''),
    on: {
      click: evt => {
        store.dispatch('form/select', { uuid, value: cloned })
        evt.stopPropagation()
      }
    }
  }
  field.children = [
    cloned,
    { component: 'v-jd-design-border', fieldOptions: { class: 'designed' } },
    {
      component: 'span',
      text: remark ? component + '.' + remark : component,
      fieldOptions: { class: 'tag designed' }
    }
  ]
}
