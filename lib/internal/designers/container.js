import defaultDesigner from './default'

// 普通容器
export default options => {
  const designer = defaultDesigner(options)

  return field => {
    designer(field)

    field.children.splice(1, 1)

    const realChild = field.children[0]
    const designComponents = field.children.splice(1, field.children.length - 1)

    realChild.children = [
      {
        component: 'v-jd-container-wrapper',
        fieldOptions: {
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
              props: { field: realChild }
            }
          },
          {
            component: 'v-jd-container-tag',
            fieldOptions: {
              props: { field: realChild }
            }
          }
        ]
      }
    ]

    field.children = [
      realChild,
      designComponents[0],
      {
        component: 'v-jd-collapse-tag',
        fieldOptions: {
          slot: 'header',
          props: { field: realChild },
          style: { float: 'left' }
        }
      },
      ...designComponents.slice(1, designComponents.length)
    ]
  }
}
