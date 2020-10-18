export default field => {
  const { component, remark } = field

  field.children = [
    {
      component: 'vuedraggable',
      skipDesigner: true,
      fieldOptions: {
        attrs: { group: 'jdesign', draggable: '.drag-handler' },
        props: {
          value: [...(field.children || [])]
        }
      },
      children: [
        ...(field.children || []),
        { component: 'v-jd-design-container', skipDesigner: true },
        {
          component: 'p',
          skipDesigner: true,
          text: remark ? `${component}.${remark}` : component,
          fieldOptions: {
            class: 'root-text',
            slot: 'footer'
          }
        }
      ]
    }
  ]
}
