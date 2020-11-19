import { isArray, set } from 'lodash-es'

export const resolveForm = (props, editing) => editors =>
  props
    .filter(prop => prop.label && prop.editable !== false)
    .map(prop => {
      const {
        name: propName,
        group,
        label,
        description,
        editor = 'default'
      } = prop
      const { name: editorName, options = {} } =
        typeof editor === 'string' ? { name: editor } : editor
      const editorFactory = editors[editorName]
      const editorContent = (typeof editorFactory === 'function'
        ? editorFactory
        : editors.default)(propName, { ...options, description })

      return {
        component: 'v-jd-property-item',
        model: [propName],
        fieldOptions: {
          attrs: { group },
          props: {
            label,
            prop: propName
          },
          on: {
            clear: prop => {
              set(editing, prop, undefined)
            }
          }
        },
        children: isArray(editorContent) ? editorContent : [editorContent]
      }
    })
