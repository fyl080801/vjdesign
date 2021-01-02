import defaultDesigner from './default'

export default options => {
  const desigen = defaultDesigner(options)

  return field => {
    desigen(field)
    field.children[0] = {
      component: 'v-jd-table-designer',
      fieldOptions: { class: 'designed' }
    }
  }
}
