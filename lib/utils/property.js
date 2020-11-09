import { isArray } from 'lodash-es'

export const resolveForm = props => editors =>
  props
    .filter(prop => prop.label && prop.editable !== false)
    .map(prop => {
      const {
        name: propName,
        group,
        label,
        description,
        editor = 'default'
        // default
      } = prop
      const { name: editorName, options = {} } =
        typeof editor === 'string' ? { name: editor } : editor
      const editorFactory = editors[editorName]
      const editorContent = (typeof editorFactory === 'function'
        ? editorFactory
        : editors.default)(propName, { ...options, description })

      return {
        component: 'v-jd-property-item',
        fieldOptions: {
          attrs: { group },
          props: { label }
        },
        children: isArray(editorContent) ? editorContent : [editorContent]
      }
    })
