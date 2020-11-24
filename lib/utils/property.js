import { get, isArray, set } from 'lodash-es'
import { deepSet } from '../utils/helpers'

export const resolveForm = (props, editing) => editors =>
  props
    .filter(prop => prop.label && prop.editable !== false)
    .map(prop => {
      const {
        name: propName,
        group,
        label,
        description,
        transform,
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
            transform
          },
          on: {
            clear: () => {
              set(editing, propName, undefined)
            },
            changeType: value => {
              const cache = get(editing, propName)

              if (value === true) {
                deepSet(editing, propName, { $type: 'design', $cache: cache })
              } else {
                if (
                  typeof cache === 'object' &&
                  cache !== null &&
                  cache.$type === 'design' &&
                  cache.$cache !== undefined
                ) {
                  deepSet(editing, propName, cache.$cache)
                } else {
                  deepSet(editing, propName, undefined)
                }
              }
            }
          }
        },
        children: isArray(editorContent) ? editorContent : [editorContent]
      }
    })
