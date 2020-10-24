import defaultDesigner from './default'

export default field => {
  defaultDesigner(field)

  field.children.splice(1, 1)

  const realChild = field.children[0]
  const designComponents = field.children.splice(1, field.children.length - 1)

  realChild.children = [
    {
      component: 'v-jd-container-wrapper',
      fieldOptions: {
        class: 'designed',
        props: {
          value: realChild.children,
          field: realChild
        }
      },
      children: [
        ...realChild.children,
        {
          component: 'v-jd-container-border',
          fieldOptions: {
            props: { field: realChild },
            class: 'designed'
          }
        },
        {
          component: 'v-jd-container-tag',
          fieldOptions: {
            class: 'designed',
            props: { field: realChild }
          }
        }
      ]
    }
  ]

  field.children = [realChild, ...designComponents]
}
