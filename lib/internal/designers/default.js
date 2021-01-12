// 默认
export default designerOptions => field => {
  const cloned = {
    fieldOptions: {},
    ...field,
    component: field.component
  }

  const design = cloned._design

  Object.keys(field).forEach(key => {
    delete field[key]
  })

  // 设计器不让响应其他事件
  delete cloned.events
  delete cloned.fieldOptions.on
  delete cloned.fieldOptions.nativeOn
  //
  delete cloned._design

  // 设计器视图不处理 slot
  if (cloned.fieldOptions.slot) {
    cloned.fieldOptions.slotName = cloned.fieldOptions.slot
    delete cloned.fieldOptions.slot
  }

  field.component = 'v-jd-design-wrapper'
  field.fieldOptions = { props: { field: cloned, ...designerOptions } }

  field.children = [
    cloned,
    { component: 'v-jd-design-face' },
    {
      component: 'v-jd-design-border',
      fieldOptions: {
        props: { field: cloned }
      }
    },
    {
      component: 'v-jd-title-tag',
      fieldOptions: {
        slot: 'header',
        props: { field: cloned, design },
        style: { float: 'left' }
      }
    },
    {
      component: 'v-jd-delete-tag',
      fieldOptions: {
        slot: 'header',
        props: { field: cloned },
        style: { position: 'absolute', right: 0, top: 0, zIndex: 2 }
      }
    }
  ]
}
