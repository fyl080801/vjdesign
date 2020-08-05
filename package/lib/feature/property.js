import { getFeature } from './map'
import { cloneDeep, isEmpty, isObject } from 'lodash-es'
import { getEditorFactory } from './editor'
// import emiter from "../../utils/emiter";

export const DEFAULT_KEYS = {
  别名: 'remark',
  命名槽: 'fieldOptions.slot',
  内部文本: 'fieldOptions.domProps.innerText',
  水印: 'fieldOptions.props.placeholder',
  数据: 'model',
  名称: 'fieldOptions.attrs.name',
  // 响应输入: "fieldOptions.on",
  样式: 'fieldOptions.class',
  条件显示: 'condition'
}

export const DEFAULTS = [
  DEFAULT_KEYS.命名槽,
  DEFAULT_KEYS.别名,
  DEFAULT_KEYS.样式,
  DEFAULT_KEYS.条件显示
]

export const getProperties = (metaArray = [], defaults = []) => {
  const props = {}
  const stored = getFeature('property')

  cloneDeep(defaults).forEach(item => {
    props[item] = { property: item, ...stored.get(item) }
  })

  metaArray.forEach(item => {
    const prop = typeof item === 'string' ? { property: item, ...stored.get(item) } : item

    props[prop.property] = { ...stored.get(prop.property), ...prop }
  })

  return props
}

export const assemblyEditor = (metaArray, defaults) => {
  const properties = getProperties(metaArray, defaults)

  return Object.keys(properties).map(prop => {
    const { editor, description, group, defaultValue, rules = [] } = properties[prop]
    const { name, options } = isObject(editor) ? editor : { name: editor }
    const { field, components } = getEditorFactory(name)(prop, options)

    return {
      group,
      property: prop,
      rules,
      editorComponents: components,
      defaultValue,
      component: 'el-form-item',
      fieldOptions: {
        class: 'property-field__wrapper',
        props: { label: description }
      },
      children: [
        field,
        {
          component: 'el-button',
          text: '清除',
          condition: {
            $type: 'func',
            $arguments: { model: { $type: 'bind', $source: `model.${prop}` } },
            $result: 'model !== undefined'
          },
          fieldOptions: {
            class: 'clear',
            props: { type: 'text' },
            on: {
              click: {
                $type: 'on',
                $arguments: {
                  model: { $type: 'bind', $source: `model` }
                },
                $result: `(() => {
                  delete model.${prop}; 
                  this.$context.$emit('input', model); 
                  this.$context.$emit('clear', '${prop}'); 
                })()`
              }
            }
          }
        }
      ]
    }
  })
}

export const assemblyEditorGroups = (metaArray, defaults) => {
  const properties = assemblyEditor(metaArray, defaults)

  return properties.reduce(
    (groups, prop) => {
      const { group, property } = prop

      if (!isEmpty(group)) {
        // 具有特定的分组名称
        groups[group] = groups[group] || []
        groups[group].push(prop)
      } else {
        // 将属性按特定规则分组
        if (property.indexOf('fieldOptions.domProps.') === 0) {
          groups.通用.push(prop)
        } else if (property.indexOf('fieldOptions.props.') === 0) {
          groups.组件.push(prop)
        } else if (
          property.indexOf('fieldOptions.style.') === 0 ||
          property.indexOf('fieldOptions.class') === 0
        ) {
          groups.样式.push(prop)
        } else {
          groups.基础.push(prop)
        }
      }

      return groups
    },
    {
      基础: [],
      通用: [],
      样式: [],
      组件: []
    }
  )
}

export default store => {
  return (
    path,
    {
      description, // 名称
      defaultValue, // 默认值
      group, // 自定义分组名
      rules // 属性验证规则
    },
    editor // 编辑器
  ) => {
    const instance = {
      description,
      editor,
      defaultValue,
      group,
      rules: rules || []
    }

    store.set(path, instance)

    return {
      description(str) {
        instance.description = str
      }
    }
  }
}
