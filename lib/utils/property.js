import { get, isArray, set } from 'lodash-es'
import { deepSet } from '../utils/helpers'

/**
 * 组合属性
 * @param {*} props 属性库
 * @param {*} list 传入的属性集
 * @param {*} defaults 属性配置的默认成员
 */
export const resolveProperties = (props, list, defaults) => {
  return list
    .map(prop => {
      const property = typeof prop === 'string' ? { name: prop } : prop
      return {
        ...defaults,
        ...props[property.name],
        ...property
      }
    })
    .reverse()
    .reduce((pre, cur) => {
      if (!pre.find(item => item.name === cur.name)) {
        pre.push(cur)
      }
      return pre
    }, [])
    .reverse()
}

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
        : editors.default)(propName, { ...options, description }, prop)

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
