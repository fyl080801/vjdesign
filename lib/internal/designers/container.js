import defaultDesigner from './default'

// 普通容器
export default () => {
  const designer = defaultDesigner()

  return field => {
    designer(field)

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
          ...realChild.children.map(item => {
            item && item.fieldOptions && (item.fieldOptions.slot = undefined)
            return item
          }),
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

    field.children = [
      realChild,
      designComponents[0],
      {
        component: 'v-jd-collapse-tag',
        fieldOptions: {
          slot: 'header',
          props: { field: realChild },
          class: 'designed',
          style: { float: 'left' }
        }
      },
      ...designComponents.slice(1, designComponents.length)
    ]
  }
}
