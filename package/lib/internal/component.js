import feature from '../feature'
import { DEFAULT_KEYS } from '../feature/property'

// 网页元素
feature.component(
  'input',
  {
    description: '输入框',
    group: '网页元素'
  },
  [DEFAULT_KEYS.数据, DEFAULT_KEYS.名称]
)

feature.component(
  'button',
  {
    description: '按钮',
    group: '网页元素'
  },
  [DEFAULT_KEYS.内部文本]
)

feature.component(
  'a',
  {
    description: '超链接',
    group: '网页元素'
  },
  [DEFAULT_KEYS.内部文本, 'fieldOptions.domProps.href', 'fieldOptions.domProps.target']
)

feature.component(
  'a',
  {
    description: '超链接',
    group: '网页元素'
  },
  [DEFAULT_KEYS.内部文本, 'fieldOptions.domProps.href', 'fieldOptions.domProps.target']
)

feature.component(
  'span',
  {
    description: '文本块',
    group: '网页元素'
  },
  [DEFAULT_KEYS.内部文本]
)

feature.component(
  'p',
  {
    description: '段落',
    group: '网页元素'
  },
  [DEFAULT_KEYS.内部文本]
)

feature.component('hr', {
  description: '分割线',
  group: '网页元素'
})

feature.component('div', {
  description: '层',
  group: '网页元素',
  container: true
})

feature.component(
  'form',
  {
    description: '表单',
    group: '网页元素',
    container: true
  },
  [
    {
      description: 'Method',
      property: 'fieldOptions.domProps.method',
      editor: {
        name: 'select',
        options: {
          items: [
            { label: 'POST', value: 'POST' },
            { label: 'GET', value: 'GET' }
          ]
        }
      },
      defaultValue: 'POST'
    },
    {
      description: 'URL',
      property: 'fieldOptions.domProps.action'
    },
    {
      description: 'Target',
      property: 'fieldOptions.domProps.target',
      editor: {
        name: 'select',
        options: {
          items: [
            { label: '空白页', value: '_blank' },
            { label: '当前页', value: '_self' }
          ]
        }
      },
      defaultValue: '_blank'
    }
  ]
)
