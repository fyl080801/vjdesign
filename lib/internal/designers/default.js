import store from '../../store'

export default field => {
  const cloned = {
    fieldOptions: {},
    ...field,
    designed: true,
    component: field.component
  }

  const { uuid, component, remark } = cloned

  Object.keys(field).forEach(key => {
    delete field[key]
  })

  field.component = 'v-jd-design-wrapper'
  field.fieldOptions = {
    props: {
      uuid,
      value: cloned
    }
  }

  field.children = [
    cloned,
    { component: 'v-jd-design-border', fieldOptions: { class: 'designed' } },
    {
      component: 'v-jd-title-tag',
      fieldOptions: {
        class: 'designed',
        props: {
          name: component,
          text: remark ? component + '.' + remark : component
        }
      }
    },
    {
      component:
        store.getters.form.editing === uuid ? 'v-jd-delete-element' : null,
      fieldOptions: { class: 'designed', props: { uuid } }
    }
  ]
}
