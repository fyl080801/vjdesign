import defaultDesigner from './default'

export default () => {
  const desigen = defaultDesigner()

  return field => {
    desigen(field)
    field.children[0] = {
      component: 'v-jd-table-designer',
      fieldOptions: { class: 'designed' }
    }
  }
}
