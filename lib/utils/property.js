export const resolveForm = props => (properties, editors) =>
  props
    .map(prop => {
      const propMeta = typeof prop === 'string' ? { name: prop } : prop
      const propertyMeta = properties.find(p => p.name === propMeta.name)
      const {
        name: propName,
        group = '通用',
        label,
        description,
        editor = 'default'
      } = { ...propertyMeta, ...propMeta }
      const { name: editorName, options } =
        typeof editor === 'string' ? { name: editor } : editor
      const editorFactory = editors[editorName]

      return {
        component: 'v-jd-property-item',
        fieldOptions: {
          attrs: { group },
          props: { label }
        },
        children: [
          (typeof editorFactory === 'function'
            ? editorFactory
            : editors.default)(propName, options),
          description ? { component: 'p', text: description } : null
        ].filter(item => item)
      }
    })
    .reduce((prev, cur) => {
      prev[cur.fieldOptions.attrs.group] =
        prev[cur.fieldOptions.attrs.group] || []

      prev[cur.fieldOptions.attrs.group].push(cur)

      return prev
    }, {})
