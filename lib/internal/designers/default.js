export default field => {
  if (field.designed) {
    return
  }

  const cloned = {
    ...field,
    designed: true,
    component: field.component
  }

  const {
    // uuid,
    component,
    remark
  } = cloned

  Object.keys(field).forEach(key => {
    delete field[key]
  })

  field.component = 'div'
  field.designed = true
  field.fieldOptions = {
    class: 'v-jd-design-wrapper drag-handler',
    on: {
      click: evt => {
        // emiter.$emit('component-selected', cloned)
        // emiter.setEditing(uuid)
        evt.stopPropagation()
      }
    }
  }
  field.children = [
    cloned,
    { component: 'v-jd-design-border', designed: true },
    {
      component: 'span',
      designed: true,
      text: remark ? component + '.' + remark : component,
      fieldOptions: { class: 'tag' }
    }
  ]
}
